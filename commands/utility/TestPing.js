const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

function createEmbed(time = undefined, user = undefined) {
    const exampleEmbed = new EmbedBuilder()
        .setColor("#35fca9")
        .setTitle("pong!")
        .setDescription(`**Время:** ${time === undefined ? "ошибка!" : `${time}мс`}`)
        .setTimestamp()
        .setFooter({ text: `Ping pong! • ${user === undefined ? "Аноним" : user}`});

    return {content: " ",embeds : [exampleEmbed], components: []};
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Проверка работы бота.'),
    async execute(interaction) {
        const start = new Date().getTime();
        await interaction.reply({content: "pong!"});
        const end = new Date().getTime();
        const user_name = interaction.user.username;
        await interaction.editReply(createEmbed(end - start, user_name));
    }
}