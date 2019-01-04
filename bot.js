const Discord = require('discord.js');
const client = new Discord.Client();

const serverid = "530704221834575873" // ID - сервер в который все идет
const serverid2 = "530702782764679168" // ID2 - сервер с которого парсится

client.on("message", message => {
    if (message.guild.id == serverid2) //если сообщение с сервера, с которого идет парсинг
    {
        if (message.embeds.toString() != "") //выполнять, если есть embed
        {
            if (message.content.startsWith("http")) {
                client.guilds.get(serverid).channels.get(client.guilds.get(serverid).channels.find('name', message.channel.name).id).send(message.content)
            } else {
                if (message.content.includes("http")) {
                    client.guilds.get(serverid).channels.get(client.guilds.get(serverid).channels.find('name', message.channel.name).id).send(message.content)
                } else {
                    var embed = new Discord.MessageEmbed(message.embeds[0])
                    var cont;
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


client.login('NDYxNTM0MjY2Njc3OTE5NzY1.DxDeIQ.Di-LTu7v7tCxrNbn4Rfd65C1Mj0'); //вход для бота