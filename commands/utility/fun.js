const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("funfic")
        .setDescription("Тестовая команда")
        .addStringOption(option1 =>
            option1.setName("test_options")
                .setDescription("Тестовая опция 1")
                .setRequired(true)
        )
        .addStringOption(option2 =>
            option2.setName("test_string")
            .setDescription("Тестовая опция 2")
            .setRequired(true)
        ),
    
    async execute(interaction){
        const user = interaction.member.user.globalName;
        const channel = interaction.options.getString("test_string");
        const message = interaction.options.getString("test_options");
        await interaction.reply("Отправка");
        if(user != "PX0PQ"){
            await interaction.editReply(`Ответ в log`);
        }
        else{
            try{
                await interaction.guild.channels.cache.get(channel).send(message);
                await interaction.editReply("Отправлено!");
            }
            catch(e){
                await interaction.editReply(`Ответ в log 3`);
            }
            //await interaction.reply(`Ответ в log 2`);
        }
        
    }
}