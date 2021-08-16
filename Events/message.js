const  Discord = require("discord.js");
const prefix = "*";

 module.exports = async(client, message) => {
  if (message.channel.type === "dm") return;
    
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commande = args.shift().toLowerCase();
  const cmd = client.commands.get(commande) || client.commands.find(cmd => cmd.help.aliases && cmd.help.aliases.includes(commande));
  if (!cmd) return;
  cmd.run(client, message, args);
 } 
