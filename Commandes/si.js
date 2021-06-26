const Discord = require("discord.js")

module.exports.run = async (bot,message) => {
message.delete(); 

  let onlines = message.guild.members.cache.filter(({
    presence
}) => presence.status !== 'offline').size;
let totalmembers = message.guild.members.cache.size;
let totalbots = message.guild.members.cache.filter(member => member.user.bot).size;
let totalroles = message.guild.roles.cache.size;
let owner = message.guild.owner.user.tag;
let totalchanneltext = message.guild.channels.cache.filter(channel => channel.type === "text");
let createdAt = message.guild.createdAt;
let ownerID = message.guild.ownerID;
let region = message.guild.region;


const EmbedSi = new Discord.MessageEmbed()
.setColor('RED')
.setTitle('Information du serveur')
.setDescription('**__Voici les informations du serveur__**')
.addFields({
    name:'propriétaire du serveur',
    value: owner,
    inline: true,
},{
    name: 'Owner ID',
    value: ownerID,
    inline: true,
},{
    name: 'Nombre de membres total',
    value: totalmembers,
    inline: true,
},{
    name: 'Membres connéctés : ',
    value: onlines,
    inline: true,
},{
    name: 'Nombre de bots sur le serveur : ',
    value: totalbots,
    inline: true,
},{
    name: 'Nombre de roles sur le serveur : ',
    value: totalroles,
    inline: true,
},{
    name: 'Nombre de channel présent sur le serveur', 
    value: totalchanneltext,
    inline:true,
},{
    name: 'Created at',
    value: createdAt,
    inline: true,
},{
    name: 'Region',
    value: region,
    inline: true,
}

)
.setTimestamp()
message.channel.send(EmbedSi);
}

module.exports.help = {
    name: "si"
}
