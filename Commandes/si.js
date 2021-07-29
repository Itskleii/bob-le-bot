const Discord = require("discord.js")
const moment = require("moment")


module.exports.run = async (bot,message) => {
message.delete(); 

let onlines = message.guild.members.cache.filter(({
    presence
}) => presence.status !== 'offline').size;
let totalmembers = message.guild.members.cache.size;
let totalbots = message.guild.members.cache.filter(member => member.user.bot).size;
let totalroles = message.guild.roles.cache.size;
let owner = message.guild.owner.user.tag;
let createdAt = moment(message.guild.createdAt).format('DD/MMM/YYYY');
let ownerID = message.guild.ownerID;
let region = message.guild.region;
let emoji = message.guild.emojis.cache.size;
var totalchanneltext = message.guild.channels.cache.filter(channel => channel.type === "text").size;
var totalchannelvoice = message.guild.channels.cache.filter(channel => channel.type === "voice").size;


const EmbedSi = new Discord.MessageEmbed()
.setColor('RED')
.setTitle('Serveur info')
.setDescription('Informations du serveur')
.addFields({
    name:'👑 Owner',
    value: owner,
    inline: true,
},{
    name: ' 🆔 Owner ID',
    value: ownerID,
    inline: true,
},{
    name: '\u200b',
    value: '\u200b',
    inline: true,
},{
    name: '👥 Membres',
    value: totalmembers,
    inline: true,
},{
    name: '🟢 Membres connéctés',
    value: onlines,
    inline: true,
},{
    name: '🤖 Bots',
    value: totalbots,
    inline: true,
},{
    name: '🎭 Roles',
    value: totalroles,
    inline: true,
},{
    name: '🖋️ Salon textuel', 
    value: totalchanneltext,
    inline:true,
},{
    name: '🔉 Salon vocaux',
    value: totalchannelvoice,
    inline: true,
},{
    name: "☺️ Emoji",
    value: emoji,
    inline: true,
},{
    name: '📅 Crée le',
    value: createdAt,
    inline: true,
},{
    name: '🌐 Region',
    value: region,
    inline: true,
},

)
.setFooter(`Commande executé par ${message.author.tag}`)
.setTimestamp()
message.channel.send(EmbedSi);
}

module.exports.help = {
    name: "si"
}
