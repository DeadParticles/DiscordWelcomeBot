const Discord = require('discord.js');
const bot = new Discord.Client();

var fs = require("fs");

bot.login('insert token here');

bot.on('ready', () =>
{
	console.log('I am ready');
});

bot.on('message', message =>
{
	if (message.content.startsWith("!role "))
	{
		roleToAssign = message.content.split("!role ").slice(1)[0];
		roleToAssign = message.guild.roles.find("name", roleToAssign);
		if(roleToAssign === null)
		{
			message.channel.sendMessage("Check the case/spelling of the role and try again.");
		}
		else if(roleToAssign.name === "Bot" || roleToAssign.name === "Guardians" || roleToAssign.name === "Leader" || roleToAssign.name === "Piro" )
		{
			message.channel.sendMessage("That role is not assignable.");
		}
		else
		{
			if(message.member.roles.has(roleToAssign.id))
			{
				message.member.removeRole(roleToAssign).catch(console.error);
				message.channel.sendMessage("You are no longer an offical **" + roleToAssign.name + " Fan**!");
			}
			else
			{
				message.member.addRole(roleToAssign).catch(console.error);
				message.channel.sendMessage("You are now an offical **" + roleToAssign.name + " Fan**!");	
			}
		}
	}
});

bot.on("guildMemberAdd", (member) => 
{
	messageToSend = "Welcome " + member.user + " to the server! Please read <#279696102805078017> for a full list of rules and type !role **roleName** to give yourself a best character role. Enjoy your stay!";
	bot.channels.get('279695917592870912').sendMessage(messageToSend);
});

bot.on("guildMemberRemove", (member) => 
{
	messageToSend = member.user.username + " has left the server.";
	bot.channels.get('279695917592870912').sendMessage(messageToSend);
});