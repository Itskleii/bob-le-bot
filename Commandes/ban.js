const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
    message.delete()

    if (!message.guild.member(message.author).hasPermission('BAN_MEMBERS')) { return message.channel.send("Vous n'avez pas les permissions de bannir un membre **[BAN_MEMBERS]**"); }
    if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) { return message.channel.send("Je n'ai pas les permission de bannir ce membre **(Je suis hiérarchiquement inférieur)**"); }
    if (message.mentions.users.size === 0) { return message.channel.send("Vous n'avez pas mentionner le membre que vous souhaitez bannir. **(@discord#0001)**"); }

        let banMember = message.guild.member(message.mentions.users.first());
        if (!banMember) { return message.channel.send("La personne que vous souhaitez bannir est introuvable."); }

        let reason = args.slice(1).join(" ");

        const dmban = new Discord.MessageEmbed()
        .setColor("GREEN")        
        .setTitle('Tu as été banni')
        .addField('Serveur :', '➪ ' +  message.guild.name, true)
        .addField('Modérateur :', '➪ ' +  `${message.author.username}#${message.author.discriminator}`, true)
        .addField('Raison :', reason ? '➪ ' +  reason: '➪ _Aucune raison spécifiée_', true)

        const msgchannelban = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle('Un membre a été banni')
        .addField('Membre banni', '➪ ' +  `${banMember.user.username}#${banMember.user.discriminator} ` + `` + ` (${banMember.id})` + ``, true)
        .addField('Modérateur', '➪ ' +  `${message.author.username}#${message.author.discriminator}`, true)
        .addField('Raison', reason ? '➪ ' +  reason: '➪ _Aucune raison spécifiée_', true)


    
        message.mentions.users.first().send(dmban)
            .then(() => {
                banMember.ban()
                    .then((member) => {
                        message.channel.send(msgchannelban);
                    })
                        .catch((err) => {
                            if (err) { return console.error(err); }
                        });
            })

            
                .catch((error) => {
                    if (error) { console.error(error); }
                        banMember.ban()
                            .then((member) => {
                                message.channel.send(`:x:`);
                            })
                                .catch((err) => {
                                    if (err) { return console.error(err); }
                                });
                });
};

module.exports.help = {
    name: 'ban'
};