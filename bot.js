const {
	Client,
	Attachment,
	MessageEmbed,
	RichEmbed
} = require('discord.js');

const jsonfile = require('jsonfile');
const infoServers = require('./config');
const log4js = require('log4js');

log4js.configure({
	appenders: {
		bot: {
			type: 'file',
			filename: 'bot-logs/bot-1.log'
		}
	},
	categories: {
		default: {
			appenders: ['bot'],
			level: 'all'
		}
	}
});

const logger = log4js.getLogger('bot');

const client = new Client();

// ID - сервер в который все идет
const serverIdClone = infoServers.serverIdClone1;
// ID2 - сервер с которого парсится
const serveridPars = infoServers.serverIdPasr1;

const token = infoServers.token1;

var channelIds = [];

// Читаем JSON файл с описанием каналов
jsonfile.readFile('channelsList.json', function (err, obj) {
	if (err) {
		logger.info('Ошибка в чтении файла channelsList.json');
		logger.error(err)
	}
	channelIds = obj
})

function remoreRoleFromeMessage(message) {
	// Убираем ненужное слово типа <@&477461531492352001>
	var strSend = "``` message ```";
	return message.replace(/[<@&]+[0-9]{0,}[>]/g, strSend);
}

client.on("ready", () => {
	logger.info("bot 1 ready!");
});

client.on("error", (e) => {
	logger.info('client 1 on error');
})

client.on("message", message => {

	logger.info("message.channel.name bot 1 -- " + message.channel.name);

	//если сообщение с сервера, с которого идет парсинг
	if (message.guild.id == serveridPars) {

		// находим корректный объект
		var currentChanel = channelIds.find((el) => {
			return el.idChannelTarget == message.channel.id
		});

		// Если объект не пустой то делаем всё по схеме
		if (currentChanel !== undefined) {

			client.guilds.get(serverIdClone).channels.get(currentChanel.idChannelMy).send(remoreRoleFromeMessage(message.content))
				.then(m => {
					logger.info(' -- SEND bot 1 -- ')
				})
				.catch(e => {
					logger.error(' -- ERROR bot 1 -- ')
				})

			// if (message.channel.id == '505794908502622223') {
			// 	logger.info('--EMBED--');
			// 	logger.info(message.embeds);
			// 	logger.info('--EMBED--');
			// }

			// Если есть embed
			if (message.embeds.length) {
				try {

					message.embeds.forEach(embed => {

						if (embed.type == 'rich') {

							let msgEmbed = new RichEmbed(embed)

							client.guilds.get(serverIdClone).channels.get(currentChanel.idChannelMy).send(msgEmbed)
								.then(m => {
									logger.info(' -- EMBED bot 1 -- ');
								})
								.catch(e => {
									logger.error(' -- ERROR-EMBED bot 1 -- ');
								})
						}

					})

				} catch (e) {
					logger.error(' -- ERROR new MessageEmbed bot 1 -- ');
				}

				// client.guilds.get(serverIdClone).channels.get(currentChanel.idChannelMy).send(embed)
				// 	.then(m => {
				// 		logger.info(' -- EMBED bot 1 -- ');
				// 	})
				// 	.catch(e => {
				// 		logger.error(' -- ERROR-EMBED bot 1 -- ');
				// 	})
			}

			// Есть ли вложенные файлы?
			if (message.attachments.array().length) {
				const attachment = new Attachment(message.attachments.array()[0].url);
				client.guilds.get(serverIdClone).channels.get(currentChanel.idChannelMy).send(attachment)
					.then(m => {
						logger.info(' -- FILE bot 1 -- ')
					})
					.catch(e => {
						logger.error(' -- ERROR-FILE bot 1 -- ')
					})
			}
		}

	}
})

client.login(token);