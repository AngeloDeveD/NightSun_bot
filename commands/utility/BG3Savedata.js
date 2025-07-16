const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bg3_save_data')
        .setDescription("Сохранить данные о персонаже Baldur's Gate 3")
        .addStringOption(character_name => 
            character_name.setName('player_name')
                .setDescription("Имя персонажа")
                .setRequired(true)    
        )
        .addNumberOption(level =>
            level.setName('player_level')
                .setDescription('Уровень персонажа')
                .setRequired(true)
        )
        .addStringOption(player_class => 
            player_class.setName("player_class")
                .setDescription("Класс персонажа")
                .setRequired(true)
                .setChoices(
                    {name: "Бард", value: "Бард"},
                    {name: "Варвар", value: "Варвар"},
                    {name: "Воин", value: "Воин"},
                    {name: "Волшебник", value: "Волшебник"},
                    {name: "Друид", value: "Друид"},
                    {name: "Жрец", value: "Жрец"},
                    {name: "Колдун", value: "Колдун"},
                    {name: "Монах", value: "Монах"},
                    {name: "Паладин", value: "Паладин"},
                    {name: "Плут", value: "Плут"},
                    {name: "Следопыт", value: "Следопыт"},
                    {name: "Черодей", value: "Чародей"}
                )    
        ),
    async execute(interaction){
        const user_name = interaction.user.username;
        const player_name = interaction.options.getString('player_name');
        const player_level = interaction.options.getNumber('player_level');
        const player_class = interaction.options.getString('player_class');
        await interaction.reply(`Имя пользователя в Discord: ${user_name}. Имя персонажа: ${player_name}. Уровень героя: ${player_level}. Класс героя: ${player_class}`);
        await interaction.followUp('Пока что в разработке!');
    }
}