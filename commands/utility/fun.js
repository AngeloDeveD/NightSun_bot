const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("funfic")
        .setDescription("Комманда для отправки сообщения в отдельный чат")
        .addStringOption(option1 =>
            option1.setName("msg")
                .setDescription("Содержания сообщения")
                .setRequired(true)
        )
        .addStringOption(option2 =>
            option2.setName("channel")
                .setDescription("Канал (id)")
                .setRequired(true)
        ),

    async execute(interaction) {
        //Получение имени отправителя комманды
        const user = interaction.member.user.globalName;
        //Сохранения в переменных id канала и содержания сообщения
        const channel = interaction.options.getString("channel");
        const message = interaction.options.getString("msg");
        await interaction.reply("Отправка");

        //Проверка на отправителя
        if (user != "PX0PQ") {
            await interaction.editReply(`Ответ в log`);
        }
        else {
            try {
                await interaction.guild.channels.cache.get(channel).send(message);
                await interaction.editReply("Отправлено!");
            }
            catch (e) {
                await interaction.editReply(`Ответ в log`);
            }
        }

    }
}