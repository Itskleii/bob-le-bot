const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    message.delete()



    const tosay = args.join(" ")

    if (!message.guild.member(message.author).hasPermission("MENTION_EVERYONE")) {
        const notperm = new Discord.MessageEmbed()
        notperm.setDescription(`:x: Vous n'avez pas la permission de me faire parler`)
        return message.channel.send(notperm)
    }

    if (!tosay) {
        const notargs = new Discord.MessageEmbed();
        notargs.setDescription(`:x: Vous n'avez pas précisé ce que je dois dire`)
        return message.channel.send(notargs)
    }

    message.channel.send(tosay);
}
module.exports.help = {
    name: "say",
}