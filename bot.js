const Discord = require('discord.js');
const client = new Discord.Client();

const serverid = "530704221834575873" // ID - сервер в который все идет
const serverid2 = "530702782764679168" // ID2 - сервер с которого парсится

const channelIds = [
	{
		name: 'канал-1',
		idChannelTarget: '530702782764679170',
		idChannelMy: '530769504515522560'
	},
	{
		name: 'канал-2',
		idChannelTarget: '530703009454358528',
		idChannelMy: '530721320674263040'
	},
	{
		name: 'канал-3',
		idChannelTarget: '530760972051415040',
		idChannelMy: '530721342207557673'
	}
];

client.on("message", message => {

	//если сообщение с сервера, с которого идет парсинг
	if (message.guild.id == serverid2) {

	var currentChanel = channelIds.find((el) => {
		return el.idChannelTarget === message.channel.id
	});

	if (currentChanel !== undefined) {
		//выполнять, если есть embed
		if (message.embeds.toString() != "") {
			if (message.content.startsWith("http")) {
				client.guilds.get(serverid).channels.get(currentChanel.idChannelMy).send(message.content)
			} else {
				if (message.content.includes("http")) {
					client.guilds.get(serverid).channels.get(currentChanel.idChannelMy).send(message.content)
				} else {
					var embed = new Discord.MessageEmbed(message.embeds[0])
					if (message.content == "") {
						client.guilds.get(serverid).channels.get(currentChanel.idChannelMy).send(embed)
					} else {
						client.guilds.get(serverid).channels.get(currentChanel.idChannelMy).send(message.content)
						client.guilds.get(serverid).channels.get(currentChanel.idChannelMy).send(embed)
					}
				}
			}
		} else {
			client.guilds.get(serverid).channels.get(currentChanel.idChannelMy).send(message.content)
		}
	}

	}
})

client.login('NDYxNTM0MjY2Njc3OTE5NzY1.DxDeIQ.Di-LTu7v7tCxrNbn4Rfd65C1Mj0'); //вход для бота