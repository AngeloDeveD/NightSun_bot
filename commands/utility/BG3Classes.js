const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js');

const fs = require('fs');

const data = fs.readFileSync('./commands/json_files/bg3_class.json', 'utf-8');
const classes = JSON.parse(data);

const newData = fs.readFileSync('./commands/json_files/bg3_subclass.json', 'utf-8'); //E:\Development\JS\NightSun_bot\commands\json_files\bg3_subclass.json
const subclasses = JSON.parse(newData);

var ChooseClass = {
    name : "none",
    img : "none",
    subclasses : ["none"],
    specifications : [["none"], ["none"]],
    features: [["none"], ["none"]],
    description: "none",
    wiki_url: "none",
    cast : "none", 
    armor: ["none"],
    weapon: ["none"],
    recommended_race: ["none"],
    perks: "none",
    deficiencies: ["none"],
    aboutSubclasses: [],
    color: "none"
};

function ClassEmbed(className = undefined){
    //console.log(className);
    if(className != undefined){
        switch(className)
        {
            case "Bard":
                ChooseClass.name = classes.bard[0].class;
                ChooseClass.img = classes.bard[1].img_url;
                ChooseClass.subclasses = classes.bard[2].subclasses;
                ChooseClass.specifications = [classes.bard[3].specifications[0].basic, classes.bard[3].specifications[1].grades];
                ChooseClass.features = [classes.bard[4].features[0].abilities, classes.bard[4].features[1].skills];
                ChooseClass.description = classes.bard[5].description;
                ChooseClass.wiki_url = classes.bard[6].wiki_url;
                ChooseClass.cast = classes.bard[7].cast;
                ChooseClass.armor = classes.bard[8].armor;
                ChooseClass.weapon = classes.bard[8].weapon;
                ChooseClass.recommended_race = classes.bard[8].recommended_race;
                ChooseClass.perks = classes.bard[9].perks;
                ChooseClass.deficiencies = classes.bard[9].deficiencies;
                ChooseClass.aboutSubclasses = subclasses.Bard;
                ChooseClass.color = classes.bard[10].color;
                break;

            case "Savage":
                ChooseClass.name = classes.savage[0].class;
                ChooseClass.img = classes.savage[1].img_url;
                ChooseClass.subclasses = classes.savage[2].subclasses;
                ChooseClass.specifications = [classes.savage[3].specifications[0].basic, classes.savage[3].specifications[1].grades];
                ChooseClass.features = [classes.savage[4].features[0].abilities, classes.savage[4].features[1].skills];
                ChooseClass.description = classes.savage[5].description;
                ChooseClass.wiki_url = classes.savage[6].wiki_url;
                ChooseClass.cast = classes.savage[7].cast;
                ChooseClass.armor = classes.savage[8].armor;
                ChooseClass.weapon = classes.savage[8].weapon;
                ChooseClass.recommended_race = classes.savage[8].recommended_race;
                ChooseClass.perks = classes.savage[9].perks;
                ChooseClass.deficiencies = classes.savage[9].deficiencies;
                ChooseClass.aboutSubclasses = subclasses.Savage;
                ChooseClass.color = classes.savage[10].color;
                break;

            case "Warrior":
                ChooseClass.name = classes.warrior[0].class;
                ChooseClass.img = classes.warrior[1].img_url;
                ChooseClass.subclasses = classes.warrior[2].subclasses;
                ChooseClass.specifications = [classes.warrior[3].specifications[0].basic, classes.warrior[3].specifications[1].grades];
                ChooseClass.features = [classes.warrior[4].features[0].abilities, classes.warrior[4].features[1].skills];
                ChooseClass.description = classes.warrior[5].description;
                ChooseClass.wiki_url = classes.warrior[6].wiki_url;
                ChooseClass.cast = classes.warrior[7].cast;
                ChooseClass.armor = classes.warrior[8].armor;
                ChooseClass.weapon = classes.warrior[8].weapon;
                ChooseClass.recommended_race = classes.warrior[8].recommended_race;
                ChooseClass.perks = classes.warrior[9].perks;
                ChooseClass.deficiencies = classes.warrior[9].deficiencies;
                ChooseClass.aboutSubclasses = subclasses.Warrior;
                ChooseClass.color = classes.warrior[10].color;
                break;

            case "Wizard":
                ChooseClass.name = classes.wizard[0].class;
                ChooseClass.img = classes.wizard[1].img_url;
                ChooseClass.subclasses = classes.wizard[2].subclasses;
                ChooseClass.specifications = [classes.wizard[3].specifications[0].basic, classes.wizard[3].specifications[1].grades];
                ChooseClass.features = [classes.wizard[4].features[0].abilities, classes.wizard[4].features[1].skills];
                ChooseClass.description = classes.wizard[5].description;
                ChooseClass.wiki_url = classes.wizard[6].wiki_url;
                ChooseClass.cast = classes.wizard[7].cast;
                ChooseClass.armor = classes.wizard[8].armor;
                ChooseClass.weapon = classes.wizard[8].weapon;
                ChooseClass.recommended_race = classes.wizard[8].recommended_race;
                ChooseClass.perks = classes.wizard[9].perks;
                ChooseClass.deficiencies = classes.wizard[9].deficiencies;
                ChooseClass.aboutSubclasses = subclasses.Wizard;
                ChooseClass.color = classes.wizard[10].color;
                break;

            case "Druid":
                ChooseClass.name = classes.druid[0].class;
                ChooseClass.img = classes.druid[1].img_url;
                ChooseClass.subclasses = classes.druid[2].subclasses;
                ChooseClass.specifications = [classes.druid[3].specifications[0].basic, classes.druid[3].specifications[1].grades];
                ChooseClass.features = [classes.druid[4].features[0].abilities, classes.druid[4].features[1].skills];
                ChooseClass.description = classes.druid[5].description;
                ChooseClass.wiki_url = classes.druid[6].wiki_url;
                ChooseClass.cast = classes.druid[7].cast;
                ChooseClass.armor = classes.druid[8].armor;
                ChooseClass.weapon = classes.druid[8].weapon;
                ChooseClass.recommended_race = classes.druid[8].recommended_race;
                ChooseClass.perks = classes.druid[9].perks;
                ChooseClass.deficiencies = classes.druid[9].deficiencies;
                ChooseClass.aboutSubclasses = subclasses.Druid;
                ChooseClass.color = classes.druid[10].color;
                break;
            
            case "Priest":
                ChooseClass.name = classes.priest[0].class;
                ChooseClass.img = classes.priest[1].img_url;
                ChooseClass.subclasses = classes.priest[2].subclasses;
                ChooseClass.specifications = [classes.priest[3].specifications[0].basic, classes.priest[3].specifications[1].grades];
                ChooseClass.features = [classes.priest[4].features[0].abilities, classes.priest[4].features[1].skills];
                ChooseClass.description = classes.priest[5].description;
                ChooseClass.wiki_url = classes.priest[6].wiki_url;
                ChooseClass.cast = classes.priest[7].cast;
                ChooseClass.armor = classes.priest[8].armor;
                ChooseClass.weapon = classes.priest[8].weapon;
                ChooseClass.recommended_race = classes.priest[8].recommended_race;
                ChooseClass.perks = classes.priest[9].perks;
                ChooseClass.deficiencies = classes.priest[9].deficiencies;
                ChooseClass.aboutSubclasses = subclasses.Priest;
                ChooseClass.color = classes.priest[10].color;
                break;
            
            case "Sorcerer":
                ChooseClass.name = classes.sorcerer[0].class;
                ChooseClass.img = classes.sorcerer[1].img_url;
                ChooseClass.subclasses = classes.sorcerer[2].subclasses;
                ChooseClass.specifications = [classes.sorcerer[3].specifications[0].basic, classes.sorcerer[3].specifications[1].grades];
                ChooseClass.features = [classes.sorcerer[4].features[0].abilities, classes.sorcerer[4].features[1].skills];
                ChooseClass.description = classes.sorcerer[5].description;
                ChooseClass.wiki_url = classes.sorcerer[6].wiki_url;
                ChooseClass.cast = classes.sorcerer[7].cast;
                ChooseClass.armor = classes.sorcerer[8].armor;
                ChooseClass.weapon = classes.sorcerer[8].weapon;
                ChooseClass.recommended_race = classes.sorcerer[8].recommended_race;
                ChooseClass.perks = classes.sorcerer[9].perks;
                ChooseClass.deficiencies = classes.sorcerer[9].deficiencies;
                ChooseClass.aboutSubclasses = subclasses.Sorcerer;
                ChooseClass.color = classes.sorcerer[10].color;
                break;

            case "Monk":
                ChooseClass.name = classes.monk[0].class;
                ChooseClass.img = classes.monk[1].img_url;
                ChooseClass.subclasses = classes.monk[2].subclasses;
                ChooseClass.specifications = [classes.monk[3].specifications[0].basic, classes.monk[3].specifications[1].grades];
                ChooseClass.features = [classes.monk[4].features[0].abilities, classes.monk[4].features[1].skills];
                ChooseClass.description = classes.monk[5].description;
                ChooseClass.wiki_url = classes.monk[6].wiki_url;
                ChooseClass.cast = classes.monk[7].cast;
                ChooseClass.armor = classes.monk[8].armor;
                ChooseClass.weapon = classes.monk[8].weapon;
                ChooseClass.recommended_race = classes.monk[8].recommended_race;
                ChooseClass.perks = classes.monk[9].perks;
                ChooseClass.deficiencies = classes.monk[9].deficiencies;
                ChooseClass.aboutSubclasses = subclasses.Monk;
                ChooseClass.color = classes.monk[10].color;
                break;

            case "Paladin":
                ChooseClass.name = classes.paladin[0].class;
                ChooseClass.img = classes.paladin[1].img_url;
                ChooseClass.subclasses = classes.paladin[2].subclasses;
                ChooseClass.specifications = [classes.paladin[3].specifications[0].basic, classes.paladin[3].specifications[1].grades];
                ChooseClass.features = [classes.paladin[4].features[0].abilities, classes.paladin[4].features[1].skills];
                ChooseClass.description = classes.paladin[5].description;
                ChooseClass.wiki_url = classes.paladin[6].wiki_url;
                ChooseClass.cast = classes.paladin[7].cast;
                ChooseClass.armor = classes.paladin[8].armor;
                ChooseClass.weapon = classes.paladin[8].weapon;
                ChooseClass.recommended_race = classes.paladin[8].recommended_race;
                ChooseClass.perks = classes.paladin[9].perks;
                ChooseClass.deficiencies = classes.paladin[9].deficiencies;
                ChooseClass.aboutSubclasses = subclasses.Paladin;
                ChooseClass.color = classes.paladin[10].color;
                break;
            
            case "Rascal":
                ChooseClass.name = classes.rascal[0].class;
                ChooseClass.img = classes.rascal[1].img_url;
                ChooseClass.subclasses = classes.rascal[2].subclasses;
                ChooseClass.specifications = [classes.rascal[3].specifications[0].basic, classes.rascal[3].specifications[1].grades];
                ChooseClass.features = [classes.rascal[4].features[0].abilities, classes.rascal[4].features[1].skills];
                ChooseClass.description = classes.rascal[5].description;
                ChooseClass.wiki_url = classes.rascal[6].wiki_url;
                ChooseClass.cast = classes.rascal[7].cast;
                ChooseClass.armor = classes.rascal[8].armor;
                ChooseClass.weapon = classes.rascal[8].weapon;
                ChooseClass.recommended_race = classes.rascal[8].recommended_race;
                ChooseClass.perks = classes.rascal[9].perks;
                ChooseClass.deficiencies = classes.rascal[9].deficiencies;
                ChooseClass.aboutSubclasses = subclasses.Rascal;
                ChooseClass.color = classes.rascal[10].color;
                break;
            
            case "Tracker":
                ChooseClass.name = classes.tracker[0].class;
                ChooseClass.img = classes.tracker[1].img_url;
                ChooseClass.subclasses = classes.tracker[2].subclasses;
                ChooseClass.specifications = [classes.tracker[3].specifications[0].basic, classes.tracker[3].specifications[1].grades];
                ChooseClass.features = [classes.tracker[4].features[0].abilities, classes.tracker[4].features[1].skills];
                ChooseClass.description = classes.tracker[5].description;
                ChooseClass.wiki_url = classes.tracker[6].wiki_url;
                ChooseClass.cast = classes.tracker[7].cast;
                ChooseClass.armor = classes.tracker[8].armor;
                ChooseClass.weapon = classes.tracker[8].weapon;
                ChooseClass.recommended_race = classes.tracker[8].recommended_race;
                ChooseClass.perks = classes.tracker[9].perks;
                ChooseClass.deficiencies = classes.tracker[9].deficiencies;
                ChooseClass.aboutSubclasses = subclasses.Tracker;
                ChooseClass.color = classes.tracker[10].color;
                break;
            
            case "Magician":
                ChooseClass.name = classes.magician[0].class;
                ChooseClass.img = classes.magician[1].img_url;
                ChooseClass.subclasses = classes.magician[2].subclasses;
                ChooseClass.specifications = [classes.magician[3].specifications[0].basic, classes.magician[3].specifications[1].grades];
                ChooseClass.features = [classes.magician[4].features[0].abilities, classes.magician[4].features[1].skills];
                ChooseClass.description = classes.magician[5].description;
                ChooseClass.wiki_url = classes.magician[6].wiki_url;
                ChooseClass.cast = classes.magician[7].cast;
                ChooseClass.armor = classes.magician[8].armor;
                ChooseClass.weapon = classes.magician[8].weapon;
                ChooseClass.recommended_race = classes.magician[8].recommended_race;
                ChooseClass.perks = classes.magician[9].perks;
                ChooseClass.deficiencies = classes.magician[9].deficiencies;
                ChooseClass.aboutSubclasses = subclasses.Magician;
                ChooseClass.color = classes.magician[10].color;
                break;

            default:
                return {content: "Класс не найден", components: []};
        }

        //console.log(ChooseClass);

        const file = new AttachmentBuilder(`./img/class/${ChooseClass.img}`)

        const exampleEmbed = new EmbedBuilder()
            .setColor(ChooseClass.color)
            .setTitle(ChooseClass.name)
            .setDescription(`${ChooseClass.description}`)
            .setURL(`${ChooseClass.wiki_url}`)
            .setThumbnail(`attachment://${ChooseClass.img}`)
            .setAuthor({ name: "Baldur's Gate 3"})
            .addFields(
                {
                    name: "Подклассы:", 
                    value: `${ChooseClass.subclasses.join('\n')}`, 
                    inline: true
                },
                {
                    name: "Базовые Харакеристики:",
                    value: " "
                },
                { 
                    name: 'Основное:', 
                    value: `* Базовое здоровье - ${ChooseClass.specifications[0][0].basic_health} ОЗ + Модификатор выносливости.\n` + 
                    `* Здоровье за уровень - ${ChooseClass.specifications[0][1].health_per_level} ОЗ + Модификатор выносливости.\n` + 
                    `* Тэг "${ChooseClass.specifications[0][2].Tag}" в диалогах`,  
                    inline: false
                },
                { 
                    name: 'Каст:', 
                    value: `* ${ChooseClass.cast}`, 
                    inline: false
                },
                { 
                    name: 'Качества:', 
                    value: `* Сила - ${ChooseClass.specifications[1][0].Strength}\n* Ловкость - ${ChooseClass.specifications[1][1].Dexterity}\n` + 
                    `* Выносливость - ${ChooseClass.specifications[1][2].Endurance}\n* Интелект - ${ChooseClass.specifications[1][3].Intelligence}\n` + 
                    `* Мудрость - ${ChooseClass.specifications[1][4].Wisdom}\n* Харизма - ${ChooseClass.specifications[1][5].Charisma}`, 
                    inline: true 
                },
                { 
                    name: 'Броня:', 
                    value: `* ${ChooseClass.armor.join('\n* ')}`, 
                    inline: true
                },
                { 
                    name: 'Оружие:', 
                    value: `* ${ChooseClass.weapon.join('\n* ')}`, 
                    inline: true
                },
                { 
                    name: 'Рекомендуемые рассы:', 
                    value: `${ChooseClass.recommended_race.join(', ')}`, 
                    inline: false
                },
                { 
                    name: 'Преимущества:', 
                    value: `* ${ChooseClass.perks.join('\n* ')}`, 
                    inline: true
                },
                { 
                    name: 'Недостатки:', 
                    value: `* ${ChooseClass.deficiencies.join('\n* ')}`, 
                    inline: true
                },
                { 
                    name: " ", 
                    value: "Информация была взята с источников:\n* **baldursgate.fandom.com**\n* **wotpack.ru**", 
                    inline: false
                }
            )
            .setTimestamp()
            .setFooter({ text: `Baldur's Gate 3 • ${ChooseClass.name}`, iconURL: `attachment://${ChooseClass.img}` });

        return {content: ChooseClass.name, embeds : [exampleEmbed], files: [file], components: []};

    }else {
        return {content: "Ошибка создания Embed!", components: []};
    }
}

function BasicFeatures(subclass, description, image){
    const file = new AttachmentBuilder(`./img/subclasses/${image}`);
    const exampleEmbed = new EmbedBuilder()
        .setColor(ChooseClass.color)
        .setTitle(`${subclass}`)
        .setDescription(`${description}`)
        .setURL(`${ChooseClass.wiki_url}`)
        .setThumbnail(`attachment://${image.split('/')[1]}`)
        .setAuthor({ name: "Подкласс"})
        .setTimestamp()
        .setFooter({ text: `Baldur's Gate 3 • ${subclass} • ${ChooseClass.name}`, iconURL: `attachment://${image.split('/')[1]}` });


        return {embeds : [exampleEmbed], files: [file], components: []};
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bg3_classes')
        .setDescription("Классы Baldur's Gate 3"),
    
    async execute(interaction){

        const selectClass = new StringSelectMenuBuilder()
            .setCustomId('ChooseClass')
		    .setPlaceholder('Выбери класс:')
            .addOptions(
				new StringSelectMenuOptionBuilder()
					.setLabel('Бард') //'Bard'
					.setValue('Bard'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Варвар') //'Savage'
					.setValue('Savage'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Воин') //'Warrior'
					.setValue('Warrior'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Волшебник') //'Wizard'
					.setValue('Wizard'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Друид') //'Druid'
					.setValue('Druid'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Жрец') //'Priest'
					.setValue('Priest'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Колдун') //'Sorcerer'
					.setValue('Sorcerer'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Монах') //'Monk'
					.setValue('Monk'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Паладин') //'Paladin'
					.setValue('Paladin'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Плут') //'Rascal'
					.setValue('Rascal'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Следопыт') //'Tracker'
					.setValue('Tracker'),
				new StringSelectMenuOptionBuilder()
					.setLabel('Чародей') //'Magician'
					.setValue('Magician')
			);
        
        const row = new ActionRowBuilder()
            .addComponents(selectClass);
        
        const response = await interaction.reply({
            content: "Классы",
            components: [row],
        });

        const collectorFilter = i => i.user.id === interaction.user.id;

        try{
            const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });

            await confirmation.update(ClassEmbed(confirmation.values[0]));
            ChooseClass.aboutSubclasses.forEach(async element => {
                await interaction.followUp(BasicFeatures(element.subclass, element.description, element.img_url));
            });

        } catch(e){
            await interaction.editReply(ClassEmbed());
        }

    }   
}
