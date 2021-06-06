const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
    message.delete()

    if (!message.guild.member(message.author).hasPermission('KICK_MEMBERS')) { return message.channel.send("Vous n'avez pas les permissions de kick un membre **[KICK_MEMBERS]**"); }
    if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) { return message.channel.send("Je n'ai pas les permission de kick ce membre **(Je suis hiérarchiquement inférieur)**"); }
    if (message.mentions.users.size === 0) { return message.channel.send("Vous n'avez pas mentionner le membre que vous souhaitez kick. **(@discord#0001)**"); }

        let kickMember = message.guild.member(message.mentions.users.first());
        if (!kickMember) { return message.channel.send("La personne que vous souhaitez kick est introuvable."); }

        let reason = args.slice(1).join(" ");

        const dmkick = new Discord.MessageEmbed()
        .setColor("RED")        
        .setTitle('Tu as été kick')
        .addField('Serveur :', '➪ ' +  message.guild.name, true)
        .addField('Modérateur :', '➪ ' +  `${message.author.username}#${message.author.discriminator}`, true)
        .addField('Raison :', reason ? '➪ ' +  reason: '➪ _Aucune raison spécifiée_', true)
        .setTimestamp()

        const msgchannelkick = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle('Un membre a été kick')
        .addField('Membre kick', '➪ ' +  `${kickMember.user.username}#${kickMember.user.discriminator} ` + `` + ` (${kickMember.id})` + ``, true)
        .addField('Modérateur', '➪ ' +  `${message.author.username}#${message.author.discriminator}`, true)
        .addField('Raison', reason ? '➪ ' +  reason: '➪ _Aucune raison spécifiée_', true)
        .setTimestamp()

    
        message.mentions.users.first().send(dmkick)
            .then(() => {
                kickMember.kick()
                    .then((member) => {
                        message.channel.send(msgchannelkick);
                    })
                        .catch((err) => {
                            if (err) { return console.error(err); }
                        });
            })

            
                .catch((error) => {
                    if (error) { console.error(error); }
                        kickMember.kick()
                            .then((member) => {
                                message.channel.send(`:x:`);
                            })
                                .catch((err) => {
                                    if (err) { return console.error(err); }
                                });
                });
};

module.exports.help = {
    name: 'kick'
}; 