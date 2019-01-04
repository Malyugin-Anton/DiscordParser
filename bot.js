const Discord = require('discord.js');
const jsonfile = require('jsonfile')

const client = new Discord.Client();

const serverid = "530704221834575873" // ID - сервер в который все идет
const serverid2 = "530702782764679168" // ID2 - сервер с которого парсится

var channelIds = [];

// Читаем JSON файл с описанием каналов
jsonfile.readFile('channelsList.json', function (err, obj) {
	if (err) console.error(err)
	channelIds = obj
})

client.on("message", message => {

	//если сообщение с сервера, с которого идет парсинг
	if (message.guild.id == serverid2) {

	// находим корректный объект
	var currentChanel = channelIds.find((el) => {
		return el.idChannelTarget === message.channel.id
	});

	// Если объект не пустой то делаем всё по схеме
	if (currentChanel !== undefined) {
		//выполнять, если есть embed
		if (message.embeds.toString() != "") {
			if (message.content.startsWith("http")) {
				client.guilds.get(serverid).channels.get(currentChanel.idChannelMy).send(message.content)
			} else {
				if (message.content.includes("http")) {
					client.guilds.get(serverid).channels.get(currentChanel.idChannelMy).send(message.content)
				} else {
					var embed = new Discord.MessageEmbed(message.embeds[0])
					if (message.content == "") {
						client.guilds.get(serverid).channels.get(currentChanel.idChannelMy).send(embed)
					} else {
						client.guilds.get(serverid).channels.get(currentChanel.idChannelMy).send(message.content)
						client.guilds.get(serverid).channels.get(currentChanel.idChannelMy).send(embed)
					}
				}
			}
		} else {
			client.guilds.get(serverid).channels.get(currentChanel.idChannelMy).send(message.content)
		}
	}

	}
})

client.login('NDYxNTM0MjY2Njc3OTE5NzY1.DxDeIQ.Di-LTu7v7tCxrNbn4Rfd65C1Mj0'); //вход для бота