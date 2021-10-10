const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    message.delete()



    if (!args[0]) {
        const notmentions = new Discord.MessageEmbed();
        notmentions.setDescription(`:x: Vous n'avez pas donné la nature du sondage`)
        return message.channel.send(notmentions)
    }

    const sondageslice = args.join(' ');

    const embed = new Discord.MessageEmbed()
    embed.setAuthor(`📰 Sondage`)
    embed.setColor('BLUE')
    embed.setDescription(`**${sondageslice}**` + "\n\n✅ oui | 🤔 peut-être | ❌ non" + `\n Ce sondage est proposé par ${message.author.tag}`)
    message.channel.send(embed).then(function (message) {
        message.react("✅")
        message.react("🤔")
        message.react("❌")
    }).catch(function () {});
}

module.exports.help = {
    name: "poll",
}
