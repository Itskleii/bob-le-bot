const Discord = require('discord.js');

module.exports.run = (client, message) => {
    const args = message.content.trim().split(/ +/g);
    message.delete();
    const question = args.slice(1).join(' ');
    if(!question || question == null) {
      message.channel.send("Veuillez indiquer la question !", {reply: message.author})
    }
    const rep_array = ["Oui", "Non", "Je ne sais pas", "Je pense que oui", "peut etre que oui", "je m'en teraballecouille","peut etre que non", "nique ta mère et arrête de me déranger"]
    const rep = rep_array[Math.floor(Math.random() * rep_array.length)]
    const rep_embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}`)
    .setColor("#5C4C48")
    .addField("Question : ", question)
    .addField("Réponse : ", rep)
    message.channel.send(rep_embed)
}; 

module.exports.help = {
    name: '8ball'
}; 