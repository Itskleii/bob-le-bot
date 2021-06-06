const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
  message.delete();

    var embedSaying = new Discord.MessageEmbed()
    .setTitle("__Information du serveur__")
    .setColor("#CD0A0A")
    .addField('Nom du serveur :', `${message.guild.name}`)
    .addField(`Nombre d'utilisateur :`, `${message.guild.memberCount}`)
    .addField('propriétaire du serveur :',`${message.guild.owner.user}`)
    .addField('Date de création du serveur :', `${message.guild.createdAt}`)
    .addField('Nombre de rôles :', `${message.guil.roles.cache.length}`)
    .addField('Région :', `${message.guild.region}`)
    .addField('Nombre de channel :', `${message.guild.channel}`)
    .setFooter(`Information demandée par ${message.author.username}`)
    .setTimestamp()
    message.channel.send(embedSaying) 
  }


  
  module.exports.help = {
    name: "si" 
} 