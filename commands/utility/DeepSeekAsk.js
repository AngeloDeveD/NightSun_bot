const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
const { Transform } = require('stream');

require('dotenv').config();

// Конфигурация
const CONFIG = {
    API_KEY: process.env.API_KEY,
    MODEL: process.env.MODEL || 'deepseek/deepseek-r1-0528:free',
    MAX_MESSAGE_LENGTH: 2000, // Лимит Discord на сообщение
    CODE_BLOCK_PADDING: 8 // Дополнительные символы для ``` и переносов строк
};

class AIResponseHandler extends Transform {
    constructor(interaction) {
        super({ readableObjectMode: true, writableObjectMode: false });
        this.interaction = interaction;
        this.buffer = '';
        this.fullResponse = [];
        this.lastUpdate = 0;
    }

    _transform(chunk, encoding, callback) {
        this.buffer += chunk.toString();

        while (true) {
            const match = this.buffer.match(/^data: (.*)(?:\n\n|\n$)/m);
            if (!match) break;

            this.buffer = this.buffer.slice(match[0].length);
            const dataStr = match[1].trim();

            if (dataStr === '[DONE]') {
                this.push(null);
                return callback();
            }

            try {
                const data = JSON.parse(dataStr);
                if (data.choices?.[0]?.delta?.content) {
                    const content = data.choices[0].delta.content;
                    this.fullResponse.push(content);
                    this.push(content);
                }
            } catch (err) {
                console.error('Ошибка парсинга JSON:', err, 'Содержимое:', dataStr);
            }
        }

        callback();
    }
}

// Функция для разбивки текста на части с учетом блоков кода
function splitLongMessage(content) {
    const messages = [];
    let currentMessage = '';
    let inCodeBlock = false;
    let codeBlockLanguage = '';

    const lines = content.split('\n');

    for (const line of lines) {
        // Проверяем начало/конец блока кода
        if (line.startsWith('```')) {
            if (inCodeBlock) {
                // Конец блока кода
                inCodeBlock = false;
                codeBlockLanguage = '';
            } else {
                // Начало блока кода
                inCodeBlock = true;
                codeBlockLanguage = line.slice(3).trim() || '';
            }
        }

        // Проверяем, поместится ли новая строка в текущее сообщение
        const potentialMessage = currentMessage
            ? `${currentMessage}\n${line}`
            : line;

        if (potentialMessage.length <= CONFIG.MAX_MESSAGE_LENGTH - CONFIG.CODE_BLOCK_PADDING) {
            currentMessage = potentialMessage;
        } else {
            // Если не помещается, сохраняем текущее сообщение и начинаем новое
            if (currentMessage) {
                messages.push(currentMessage);
                currentMessage = line;
            } else {
                // Если строка сама по себе слишком длинная, разбиваем её
                const chunkSize = CONFIG.MAX_MESSAGE_LENGTH - CONFIG.CODE_BLOCK_PADDING;
                for (let i = 0; i < line.length; i += chunkSize) {
                    messages.push(line.slice(i, i + chunkSize));
                }
            }
        }
    }

    // Добавляем оставшийся текст
    if (currentMessage) {
        messages.push(currentMessage);
    }

    return messages;
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("deepseek")
        .setDescription("Отправляет запрос к DeepSeek AI")
        .addStringOption(option =>
            option.setName("message")
                .setDescription("Текст запроса")
                .setRequired(true)
                .setMaxLength(2000)),

    async execute(interaction) {
        try {
            await interaction.deferReply();
            const message = interaction.options.getString("message");

            if (!message?.trim()) {
                return await interaction.editReply("Запрос не может быть пустым");
            }

            const response = await axios({
                method: 'post',
                url: 'https://openrouter.ai/api/v1/chat/completions',
                headers: {
                    'Authorization': `Bearer ${CONFIG.API_KEY}`,
                    'Content-Type': 'application/json'
                },
                data: {
                    model: CONFIG.MODEL,
                    messages: [{ role: 'user', content: message }],
                    stream: true
                },
                responseType: 'stream',
                timeout: 30000
            });

            const stream = response.data.pipe(new AIResponseHandler(interaction));
            let replyMessage = null;
            let lastUpdate = 0;
            let fullContent = '';

            for await (const chunk of stream) {
                fullContent += chunk;

                const now = Date.now();
                if (now - lastUpdate > 1000 || !replyMessage) {
                    lastUpdate = now;
                    try {
                        replyMessage = replyMessage
                            ? await interaction.editReply(fullContent.slice(0, CONFIG.MAX_MESSAGE_LENGTH))
                            : await interaction.editReply(fullContent.slice(0, CONFIG.MAX_MESSAGE_LENGTH));
                    } catch (error) {
                        console.error('Ошибка обновления сообщения:', error);
                    }
                }
            }

            // Разбиваем финальное сообщение на части при необходимости
            if (fullContent) {
                const messages = splitLongMessage(fullContent);

                // Первое сообщение - редактируем исходный ответ
                await interaction.editReply(messages[0]);

                // Отправляем остальные как новые сообщения
                for (let i = 1; i < messages.length; i++) {
                    await interaction.followUp(messages[i]);
                }
            } else {
                await interaction.editReply("Не получилось сформировать ответ");
            }

        } catch (error) {
            console.error('Ошибка выполнения команды:', error);

            let errorMessage = "Произошла ошибка при обработке запроса";
            if (error.response) {
                console.error('Детали ошибки:', error.response.data);
                errorMessage += ` (HTTP ${error.response.status})`;
            } else if (error.code === 'ECONNABORTED') {
                errorMessage = "Превышено время ожидания ответа от сервера";
            }

            try {
                await interaction.editReply(errorMessage);
            } catch (editError) {
                console.error('Не удалось отправить сообщение об ошибке:', editError);
            }
        }
    }
};