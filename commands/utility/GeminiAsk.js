const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

require('dotenv').config();

const CONFIG = {
    API_KEY: process.env.API_KEY,
    MODEL: 'google/gemma-3-4b-it:free', // Или 'gemini/gemini-pro-vision' для работы с изображениями
    MAX_MESSAGE_LENGTH: 2000
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName("gemini")
        .setDescription("Задайте вопрос с изображением")
        .addStringOption(option =>
            option.setName("question")
                .setDescription("Ваш вопрос")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("image_url")
                .setDescription("Ссылка на изображение (например, с Imgur)")
                .setRequired(false)
        ),

    async execute(interaction) {
        await interaction.deferReply();

        const question = interaction.options.getString("question");
        const imageUrl = interaction.options.getString("image_url");

        try {
            // Формируем содержимое сообщения
            const messagesContent = [
                { type: "text", text: question }
            ];

            if (imageUrl) {
                messagesContent.push({
                    type: "image_url",
                    image_url: { url: imageUrl }
                });
            }

            const response = await axios.post(
                "https://openrouter.ai/api/v1/chat/completions",
                {
                    model: CONFIG.MODEL,
                    messages: [
                        {
                            role: "user",
                            content: messagesContent
                        }
                    ]
                },
                {
                    headers: {
                        "Authorization": `Bearer ${CONFIG.API_KEY}`,
                        "Content-Type": "application/json"
                    },
                    timeout: 30000
                }
            );

            const answer = response.data.choices[0].message.content;

            // Разбиваем длинный ответ на части
            if (answer.length > CONFIG.MAX_MESSAGE_LENGTH) {
                const parts = [];
                for (let i = 0; i < answer.length; i += CONFIG.MAX_MESSAGE_LENGTH) {
                    parts.push(answer.substring(i, i + CONFIG.MAX_MESSAGE_LENGTH));
                }

                await interaction.editReply(parts[0]);
                for (let i = 1; i < parts.length; i++) {
                    await interaction.followUp(parts[i]);
                }
            } else {
                await interaction.editReply(answer);
            }

        } catch (error) {
            console.error('Ошибка:', error);
            await interaction.editReply("Произошла ошибка при обработке запроса");
        }
    }
};