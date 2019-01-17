const {
  Client,
  Attachment,
  MessageEmbed,
  RichEmbed
} = require('discord.js');

const client = new Client();
const infoServers = require('./config');
const log4js = require('log4js');

log4js.configure({
  appenders: {
    bot: {
      type: 'file',
      filename: 'bot-logs/bot-2.log'
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

// ID - сервер в который все идет
const serverIdClone = infoServers.serverIdClone2;
// ID2 - сервер с которого парсится
const serveridPars = infoServers.serverIdPasr2;

const token = infoServers.token2;

client.on("ready", () => {
  logger.info("bot 2 ready!");
});

client.on("error", (e) => {
  logger.info('client 2 on error');
})

client.on("message", message => {

  logger.info("message.channel.name bot 2 -- " + message.channel.name);

  //если сообщение с сервера, с которого идет парсинг
  if (message.guild.id == serveridPars) {

    var currentChanel = client.guilds.get(serverIdClone).channels.find(x => x.name === message.channel.name);

    if (currentChanel !== undefined) {

      client.guilds.get(serverIdClone).channels.get(currentChanel.id).send(message.content)
        .then(m => {
          logger.info(' -- SEND bot 2 -- ')
        })
        .catch(e => {
          logger.error(' -- ERROR bot 2 -- ')
        })

      // Если есть embed
      if (message.embeds.length) {
        try {
          message.embeds.forEach(embed => {

            var msgEmbed = 'none';

            if (embed.type == 'rich') { 
              msgEmbed = new RichEmbed(embed)
            } else {
              msgEmbed = new MessageEmbed(embed)
            }

            client.guilds.get(serverIdClone).channels.get(currentChanel.id).send(msgEmbed)
              .then(m => {
                logger.info(' -- EMBED bot 2 -- ');
              })
              .catch(e => {
                logger.error(' -- ERROR-EMBED bot 2-1 -- ');
              })

          })
          
        } catch (e) {
          logger.error(' -- ERROR-EMBED bot bot 2-2 -- ');
        }
      }

      // Есть ли вложенные файлы?
      if (message.attachments.array().length) {
        const attachment = new Attachment(message.attachments.array()[0].url);
        client.guilds.get(serverIdClone).channels.get(currentChanel.id).send(attachment)
          .then(m => {
            logger.info(' -- FILE bot 2 -- ')
          })
          .catch(e => {
            logger.error(' -- ERROR-FILE bot 2 -- ')
          })
      }

    } else {
      logger.error('Имя канала на которм вылетает ошибка -- ' + message.channel.name)
    }
  }

})

client.login(token);