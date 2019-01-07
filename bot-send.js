const Discord = require('discord.js');
const client = new Discord.Client();
const infoServers = require('./config')

const serverid = "530704221834575873" // ID - сервер в который все идет
const serverid2 = "530702782764679168" // ID2 - сервер с которого парсится

client.on("ready", () => {
  console.log("bot 2 ready!");
});

client.on("message", message => {
  //если сообщение с сервера, с которого идет парсинг
  if (message.guild.id == serverid2) {

    //выполнять, если есть embed
    if (message.embeds.toString() != "") {
      if (message.content.startsWith("http")) {

        client.guilds.get(serverid).channels.get(client.guilds.get(serverid).channels.find('name', message.channel.name).id).send(message.content)
      
      } else {

        if (message.content.includes("http")) {
          
          client.guilds.get(serverid).channels.get(client.guilds.get(serverid).channels.find('name', message.channel.name).id).send(message.content)
        
        } else {
          
          var embed = new Discord.MessageEmbed(message.embeds[0])
          
          if (message.content == "") {
            
            client.guilds.get(serverid).channels.get(client.guilds.get(serverid).channels.find('name', message.channel.name).id).send(embed)
          
          } else {
            
            client.guilds.get(serverid).channels.get(client.guilds.get(serverid).channels.find('name', message.channel.name).id).send(message.content)
            client.guilds.get(serverid).channels.get(client.guilds.get(serverid).channels.find('name', message.channel.name).id).send(embed)

          }
        }
      }
    } else {

      client.guilds.get(serverid).channels.get(client.guilds.get(serverid).channels.find('name', message.channel.name).id).send(message.content)

    }
  }

})

client.login(process.env.BOT_TOKEN); //вход для бота