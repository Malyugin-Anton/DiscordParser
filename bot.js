const Discord = require('discord.js');
const client = new Discord.Client();
const CC = require('./command_create.js');
const Command = CC.Command;

const serverid = process.env.ID



var Commandss = new CC.Commands();
var fs = require("fs");

function commandIs(str, msg){
    return msg.content.toLowerCase().startsWith("." + str);
}

function pluck(array) {
    return array.map(function(item) { return item["name"]; });
}

function hasRole(mem, role)
{
    if (pluck(mem.roles).includes(role))
    {
        return true;
    }
    else
    {
        return false;
    }
}

client.on("message", message =>
{
    if(message.embeds.toString() != "")
    {
       if(message.content.startsWith("http"))
       {
        client.guilds.get(serverid).channels.get(client.guilds.get(serverid).channels.find('name', message.channel.name).id).send(message.content)
       }
       else
       {
           if(message.content.includes("http"))
           {
            client.guilds.get(serverid).channels.get(client.guilds.get(serverid).channels.find('name', message.channel.name).id).send(message.content)
           }
           else
           {
            var embed = new Discord.MessageEmbed(message.embeds[0])
            var cont;
            if(message.content == "")
            {
                client.guilds.get(serverid).channels.get(client.guilds.get(serverid).channels.find('name', message.channel.name).id).send(embed)
            }
            else
            {
                client.guilds.get(serverid).channels.get(client.guilds.get(serverid).channels.find('name', message.channel.name).id).send(message.content)
                client.guilds.get(serverid).channels.get(client.guilds.get(serverid).channels.find('name', message.channel.name).id).send(embed)

            }
        
           }

       }
    }
    else
    {
        
       client.guilds.get(serverid).channels.get(client.guilds.get(serverid).channels.find('name', message.channel.name).id).send(message.content)
        
    }
})


client.login(process.env.BOT_TOKEN);


