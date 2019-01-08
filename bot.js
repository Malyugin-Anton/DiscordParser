const Discord = require('discord.js');
const jsonfile = require('jsonfile')
const infoServers = require('./config')

const client = new Discord.Client();

// ID - сервер в который все идет
const serverIdClone = infoServers.serverIdClone1;
// ID2 - сервер с которого парсится
const serveridPars = infoServers.serverIdPasr1;

const token = infoServers.token1;

var channelIds = [];

// Читаем JSON файл с описанием каналов
jsonfile.readFile('channelsList.json', function (err, obj) {
	if (err) {
		console.log('Ошибка в чтении файла channelsList.json')
		console.error(err)
	}
	channelIds = obj
})

client.on("ready", () => {
	console.log("bot 1 ready!");
});

client.on("message", message => {

	//если сообщение с сервера, с которого идет парсинг
	if (message.guild.id == serveridPars) {

	// находим корректный объект
	var currentChanel = channelIds.find((el) => {
		return el.idChannelTarget == message.channel.id
	});

	// Если объект не пустой то делаем всё по схеме
	if (currentChanel !== undefined) {
		//выполнять, если есть embed
		if (message.embeds.toString() != "") {
			if (message.content.startsWith("http")) {
				client.guilds.get(serverIdClone).channels.get(currentChanel.idChannelMy).send(message.content)
				console.log(' -- SEND bot - 1 -- ');
			} else {
				if (message.content.includes("http")) {
					client.guilds.get(serverIdClone).channels.get(currentChanel.idChannelMy).send(message.content)
					console.log(' -- SEND bot - 1 -- ');
				} else {
					var embed = new Discord.MessageEmbed(message.embeds[0])
					if (message.content == "") {
						client.guilds.get(serverIdClone).channels.get(currentChanel.idChannelMy).send(embed)
						console.log(' -- SEND bot - 1 -- ');
					} else {
						client.guilds.get(serverIdClone).channels.get(currentChanel.idChannelMy).send(message.content)
						console.log(' -- SEND bot - 1 -- ');
						client.guilds.get(serverIdClone).channels.get(currentChanel.idChannelMy).send(embed)
						console.log(' -- SEND bot - 1 -- ');
					}
				}
			}
		} else {
			client.guilds.get(serverid).channels.get(currentChanel.idChannelMy).send(message.content)
			console.log(' -- SEND bot - 1 -- ');
		}
	}

	}
})

client.login(token);