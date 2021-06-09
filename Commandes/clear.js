const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    message.delete() 
   
    if (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) {
    const notpermm = new Discord.MessageEmbed()
    notpermm.setDescription(`:x: Vous n'avez pas la permission de supprimer des messages`)
    return message.channel.send(notpermm) } 

    if  (!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) {
        const paperm = new Discord.MessageEmbed()
        setDescription(`:x: Vous ne m'avez pas accordé la permission de supprimer des messages`)
            return message.channel.send(paperm) }

            if (!args[0]) {
                const msgsupp = new Discord.MessageEmbed()
                msgsupp.setDescription(`:x: Vous n'avez pas indiqué le nombre de message(s) à supprimer`)
                return message.channel.send(msgsupp) } 

                if (args[0] > 100 || args[0] < 1) {
                    const msglimit = new Discord.MessageEmbed()
                    msglimit.setDescription(`:x: Je n'ai pas la chance de supprimer plus de 100 messages (ou moins que 1)`)
                    return message.channel.send(msglimit) }
                   
                   
                    await message.channel.bulkDelete(args[0]);

                    const embeded = new Discord.MessageEmbed()
                    embeded.setDescription(`${args[0]} Message(s) ont été supprimé(s)`)
                    embeded.setColor('GREEN')
                    embeded.setFooter(`Par : ${message.author.tag}`)
                    message.delete({ timeout: 100 })
                    message.channel.send(embeded) }


module.exports.help = {
    name: 'clear'
}; 
