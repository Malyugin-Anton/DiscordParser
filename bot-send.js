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

    //выполнять, если есть embed
    if (message.embeds.toString() != "") {
      if (message.content.startsWith("http")) {

        client.guilds.get(serverIdClone).channels.get(client.guilds.get(serverIdClone).channels.find('name', message.channel.name).id).send(message.content)
        console.log(' -- SEND bot - 2-- ');
      
      } else {

        if (message.content.includes("http")) {
          
          client.guilds.get(serverIdClone).channels.get(client.guilds.get(serverIdClone).channels.find('name', message.channel.name).id).send(message.content)
          console.log(' -- SEND bot - 2-- ');
        
        } else {
          
          var embed = new Discord.MessageEmbed(message.embeds[0])
          
          if (message.content == "") {
            
            client.guilds.get(serverIdClone).channels.get(client.guilds.get(serverIdClone).channels.find('name', message.channel.name).id).send(embed)
            console.log(' -- SEND bot - 2-- ');
          
          } else {
            
            client.guilds.get(serverIdClone).channels.get(client.guilds.get(serverIdClone).channels.find('name', message.channel.name).id).send(message.content)
            console.log(' -- SEND bot - 2-- ');
            client.guilds.get(serverIdClone).channels.get(client.guilds.get(serverIdClone).channels.find('name', message.channel.name).id).send(embed)
            console.log(' -- SEND bot - 2-- ');

          }
        }
      }
    } else {

      client.guilds.get(serverIdClone).channels.get(client.guilds.get(serverIdClone).channels.find('name', message.channel.name).id).send(message.content)
      console.log(' -- SEND bot - 2-- ');

    }
  }

})

client.login(token);