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

function remoreRoleFromeMessage(message) {
	// Убираем ненужное слово типа <@&477461531492352001>
	return message.replace(/[<@&]+[0-9]{0,}[>]/g, "");
}

client.on("ready", () => {
	console.log("bot 1 ready!");
});

client.on("error", (e) => {
	console.log(e);
})

client.on("message", message => {

	//если сообщение с сервера, с которого идет парсинг
	if (message.guild.id == serveridPars) {

		console.log("message.channel.name bot 1 -- " + message.channel.name);

		// находим корректный объект
		var currentChanel = channelIds.find((el) => {
			return el.idChannelTarget == message.channel.id
		});

		// Если объект не пустой то делаем всё по схеме
		if (currentChanel !== undefined) {

			client.guilds.get(serverIdClone).channels.get(currentChanel.idChannelMy).send(remoreRoleFromeMessage(message.content))
				.then(m => console.log(' -- SEND bot 1 -- '))
				.catch(e => console.log(' -- ERROR bot 1 -- '))

			// Если есть embed
			if (message.embeds.length) {
				const embed = new MessageEmbed(message.embeds[0])
				client.guilds.get(serverIdClone).channels.get(currentChanel.idChannelMy).send(embed)
					.then(m => {
						console.log(' -- EMBED bot 1 -- ');
					})
					.catch(e => {
						console.log(' -- ERROR-EMBED bot 1 -- ');
					})
			}

			// Есть ли вложенные файлы?
			if (message.attachments.array().length) {
				const attachment = new Attachment(message.attachments.array()[0].url);
				client.guilds.get(serverIdClone).channels.get(currentChanel.idChannelMy).send(attachment)
					.then(m => console.log(' -- FILE bot 1 -- '))
					.catch(e => console.log(' -- ERROR-FILE bot 1 -- '))
			}
		}

	}
})

client.login(token);