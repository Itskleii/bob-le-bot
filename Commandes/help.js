const pagination = require('discord.js-pagination');

const Discord = require('discord.js');

    module.exports.run = async (client, message, args) => {
      message.delete()

        const modération = new Discord.MessageEmbed()
        .setTitle('modération')
        .addField('*kick', 'Kick un membre du serveur')
        .addField('*ban', 'Banni un membre du serveur')
        .setColor('RED')
        .setTimestamp()

        const fun = new Discord.MessageEmbed()
        .setTitle('Fun')
        .addField('*8ball', 'posez une question et le bot vous répondra')
        .addField('*ascii', 'Converti un message en ascii')
        .addField('*ass', 'Envoie des images de ass')
        .addField('*ddos', 'Mentionnez un utilisateur et le bot compte le ddos')
        .addField('*fban', 'C est une fausse commande de bannissement')
        .addField('*say', 'Sert à faire parler le bot')
        .setColor('RED')
        .setTimestamp()
         

        const Utilitaire = new Discord.MessageEmbed()
        .setTitle('Utilitaire')
        .addField('*annonce', 'Envoie un message en embed')
        .addField('*clear', 'Supprime le nombre de messages préciser')
        .addField('*poll', 'Sert à faire un sondage')
        .addField('*si','Affiche les informations du serveur')
        .setColor('RED')
        .setTimestamp()




        const pages = [
                modération,
                fun,
                Utilitaire
        ]

        const emojiList = ["⏪", "⏩"];

        const timeout = '900000000';

        pagination(message, pages, emojiList, timeout)
    }

      
  module.exports.help = {
    name: "help"
}
