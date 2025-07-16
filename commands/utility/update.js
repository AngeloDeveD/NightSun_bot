const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');

const fs = require('fs');

const data = fs.readFileSync('./commands/json_files/update_info.json', 'utf-8');
const updateInfo = JSON.parse(data)

module.exports = {
    data: new SlashCommandBuilder()
        .setName("update")
        .setDescription("Новое обновление!"),
    
    async execute(interaction){
        const simpleChannel = interaction.guild.channels.cache.get(updateInfo.channels[0]);
        const vipChannels = interaction.guild.channels.cache.get(updateInfo.channels[1])
        await simpleChannel.send(updateInfo.update.join("\n"));
        await vipChannels.send(updateInfo.vip_update.join("\n"));
        await interaction.reply("Сообщения успешно отправлены!");
    }
}