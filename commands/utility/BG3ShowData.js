const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bg3_show_data')
        .setDescription("Показать данные о персонаже Baldur's Gate 3"),
    async execute(interaction){
        const user = interaction.user;
        
        await interaction.reply(`Привет, ${user.username}. Пока что команда в разработке!!!`);
    }
}