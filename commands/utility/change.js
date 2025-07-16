const { error } = require('console');
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const fs = require('fs');

const data = fs.readFileSync('./commands/json_files/change_message.json', 'utf-8');
const newMessage = JSON.parse(data);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("fuck")
        .setDescription("Да ёбаный в рот")
        .addStringOption(option1 =>
            option1.setName("id")
                .setDescription("id")
                .setRequired(true)
        )
        .addStringOption(option2 =>
            option2.setName("message")
                .setDescription("Сообщение")
                .setRequired(true)
        ),

    async execute(interaction) {
        const user = interaction.member.user.globalName;
        const id = interaction.options.getString("id");
        const message = interaction.options.getString("message");
        await interaction.reply("Отправка");
        if (user != "PX0PQ") {
            await interaction.editReply(`Чего блять ?`);
        }
        else {
            try {
                const channel = interaction.guild.channels.cache.get(id);
                channel.messages.fetch(message)
                    .then(oldMessage => {
                        oldMessage.edit(Array.isArray(newMessage.message) === false ? newMessage.message : newMessage.message.join(" "));
                    });
                await interaction.editReply("Изменено!");
            } catch (e) {
                console.error(e);
                await interaction.editReply("Не, чел. Не работает!");
            }
        }
    }
}