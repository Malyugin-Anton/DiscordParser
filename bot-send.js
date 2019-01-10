const Discord = require('discord.js');
const client = new Discord.Client();
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

    var currentChanel = client.guilds.get(serverIdClone).channels.find(x => x.name === message.channel.name);

    if (currentChanel !== undefined) {

      client.guilds.get(serverIdClone).channels.get(currentChanel.id).send(remoreRoleFromeMessage(message.content))
        .then(m => console.log(' -- SEND bot 1 - 2 -- '))
        .catch(e => console.log(' -- ERROR bot 1 - 2 -- '))

      if (message.embeds.length) {
        client.guilds.get(serverIdClone).channels.get(currentChanel.id).send(message.embeds[0])
          .then(m => {
            console.log(' -- SEND EMBED bot 2 - 2 -- ');
            console.log("message.embeds -- ", message.embeds.length);
          })
          .catch(e => {
            console.log(' -- ERROR EMBED bot 2 - 2 -- ');
          })
      }

    } else {
      console.log('Имя канала на которм вылетает ошибка -- ' + message.channel.name)
    }
  }

})

client.login(token);