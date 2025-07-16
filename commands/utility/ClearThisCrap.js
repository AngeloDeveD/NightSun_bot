const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clean_shit_up')
        .setDescription('Очистка дерьма в чате')
        .addNumberOption(option => 
            option.setName('amount_of_shit')
                .setDescription("Кол-во сообщений")
                .setRequired(false)
        ),
    
    async execute(interaction){
        const numbers = interaction.options.getNumber('amount_of_shit');
        await interaction.reply(`Кол-во удаленого дерьма = ${numbers === null ? 1 : numbers}`);
        await interaction.channel.bulkDelete(numbers === null ? 2 : numbers + 1)
            .then(messages => console.log(`Удалено ${messages.size} сообщений(-е)`))
            .catch(console.error)
    }
}