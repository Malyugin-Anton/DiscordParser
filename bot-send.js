const Discord = require('discord.js');
const client = new Discord.Client();
const infoServers = require('./config')

// ID - сервер в который все идет
const serverIdClone = infoServers.serverIdClone2;
// ID2 - сервер с которого парсится
const serveridPars = infoServers.serverIdPasr2;

const token = infoServers.token2;

client.on("ready", () => {
  console.log("bot 2 ready!");
});

client.on("message", message => {
  //если сообщение с сервера, с которого идет парсинг
  if (message.guild.id == serveridPars) {

    var currentChanel = client.guilds.get(serverIdClone).channels.find(x => x.name === message.channel.name);

    if (currentChanel !== undefined) {

      // Убираем ненужное слово типа <@&477461531492352001>
      message.content.replace(/[<@&]+[0-9]{0,}[>]/g, "");

      //выполнять, если есть embed
      if (message.embeds.toString() != "") {
        if (message.content.startsWith("http")) {
          client.guilds.get(serverIdClone).channels.get(currentChanel.id).send(message.content)
            .then(m => console.log(' -- SEND bot 1 - 2 -- '))
            .catch(e => console.log(' -- ERROR bot 1 - 2 -- '))
        } else {
          if (message.content.includes("http")) {
            client.guilds.get(serverIdClone).channels.get(currentChanel.id).send(message.content)
              .then(m => console.log(' -- SEND bot 2 - 2 -- '))
              .catch(e => console.log(' -- ERROR bot 2 - 2 -- '))
          } else {
            var embed = new Discord.MessageEmbed(message.embeds[0])
            if (message.content == "") {
              client.guilds.get(serverIdClone).channels.get(currentChanel.id).send(embed)
                .then(m => console.log(' -- SEND bot 3 - 2 -- '))
                .catch(e => console.log(' -- ERROR bot 3 - 2 -- '))
            } else {
              client.guilds.get(serverIdClone).channels.get(currentChanel.id).send(message.content)
                .then(m => console.log(' -- SEND bot 4 - 2 -- '))
                .catch(e => console.log(' -- ERROR bot 4 - 2 -- '))
              client.guilds.get(serverIdClone).channels.get(currentChanel.id).send(embed)
                .then(m => console.log(' -- SEND bot 5 - 2 -- '))
                .catch(e => console.log(' -- ERROR bot 5 - 2 -- '))
            }
          }
        }
      } else {
        client.guilds.get(serverIdClone).channels.get(currentChanel.id).send(message.content)
          .then(m => console.log(' -- SEND bot 6 - 2 -- '))
          .catch(e => console.log(' -- ERROR bot 6 - 2 -- '))
      }
    } else {
      console.log('Имя канала на которм вылетает ошибка -- ' + message.channel.name)
    }
  }

})

client.login(token);