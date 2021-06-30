const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
    message.delete()



    var embednoperm = new Discord.MessageEmbed()
    .setColor('RED') 
    .setTitle('ERREUR')
    .setDescription(`:x: Vous n'avez pas la permission de kick un utilisateur, **[KICK_MEMBERS]**`)
    .setTimestamp()

    var embednopermbot = new Discord.MessageEmbed()
    .setColor('RED') 
    .setTitle("ERREUR")
    .setDescription(`:x: Je n'ai pas la permission de kick cet utilisateur`)
    .setTimestamp()

    var nomention = new Discord.MessageEmbed()
    .setColor('RED')
    .setTitle("ERREUR")
    .setDescription(`:x: Vous n'avez pas mentionner le membre que vous souhaitez kick, **(@discord#0001)**`)
    .setTimestamp()




    if (!message.guild.member(message.author).hasPermission('KICK_MEMBERS')) { return message.channel.send(embednoperm); }
    if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) { return message.channel.send(embednopermbot); }
    if (message.mentions.users.size === 0) { return message.channel.send(nomention); }

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
