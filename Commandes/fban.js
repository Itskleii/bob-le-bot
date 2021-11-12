const { MessageEmbed } = require('discord.js')

module.exports.run = async(client, message, args) => {
    message.delete()

    const user = message.mentions.users.first();
    const embedSaying = new MessageEmbed()
    .setTitle("Bannissement")
    .setColor('#ff0000')
    .setDescription(`${user} a bien été banni !`)
    .setThumbnail('https://cdn.discordapp.com/attachments/791596143925657610/842849187816538132/836684784955818024.png')
    message.channel.send(embedSaying).catch(console.error); 
}

module.exports.help = {
    name: 'fban'
} 
