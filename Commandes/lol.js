const Discord = require("discord.js");
const NSFW = require("discord-nsfw");
const nsfw = new NSFW();

module.exports.run = async (client, message) => {


const image = await nsfw.boobs();
const embed = new Discord.MessageEmbed()
    .setTitle(`boobs`)
    .setColor("GREEN")
    .setImage(image);
console.log(message.channel)
message.channel.send( {embeds:[embed]} )}; 



module.exports.help={name:"boobs"}
