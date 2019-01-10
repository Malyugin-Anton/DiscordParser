const {
  Client,
  Attachment,
  MessageEmbed
} = require('discord.js');

const client = new Client();
const infoServers = require('./config')

// ID - сервер в который все идет
const serverIdClone = infoServers.serverIdClone2;
// ID2 - сервер с которого парсится
const serveridPars = infoServers.serverIdPasr2;

const token = infoServers.token2;

function remoreRoleFromeMessage(message) {
  // Убираем ненужное слово типа <@&477461531492352001>
  return message.replace(/[<@&]+[0-9]{0,}[>]/g, "");
}

client.on("ready", () => {
  console.log("bot 2 ready!");
});

client.on("error", (e) => {
  console.log(e);
})

client.on("message", message => {
  //если сообщение с сервера, с которого идет парсинг
  if (message.guild.id == serveridPars) {

    console.log("message.channel.name bot 2 -- " + message.channel.name);

    var currentChanel = client.guilds.get(serverIdClone).channels.find(x => x.name === message.channel.name);

    if (currentChanel !== undefined) {

      client.guilds.get(serverIdClone).channels.get(currentChanel.id).send(remoreRoleFromeMessage(message.content))
        .then(m => console.log(' -- SEND bot 2 -- '))
        .catch(e => console.log(' -- ERROR bot 2 -- '))

      // Если есть embed
      if (message.embeds.length) {
        const embed = new MessageEmbed(message.embeds[0])
        client.guilds.get(serverIdClone).channels.get(currentChanel.id).send(embed)
          .then(m => { console.log(' -- EMBED bot 2 -- '); })
          .catch(e => { console.log(' -- ERROR-EMBED bot 2 -- '); })
      }

      // Есть ли вложенные файлы?
      if (message.attachments.array().length) {
        const attachment = new Attachment(message.attachments.array()[0].url);
        client.guilds.get(serverIdClone).channels.get(currentChanel.id).send(attachment)
          .then(m => console.log(' -- FILE bot 2 -- '))
          .catch(e => console.log(' -- ERROR-FILE bot 2 -- '))
      }

    } else {
      console.log('Имя канала на которм вылетает ошибка -- ' + message.channel.name)
    }
  }

})

client.login(token);