const { MessageEmbed } = require("discord.js")
const db = require('quick.db');

module.exports.run = async (client, message, args) => {
    message.delete()

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Vous n'avez pas la permission pour débannir un utilisateur")

        if (!args[0]) return message.channel.send("Veuillez entrer un nom d'utilisateur")
      
        let bannedMemberInfo = await message.guild.fetchBans()

        let bannedMember;
        bannedMember = bannedMemberInfo.find(b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || bannedMemberInfo.get(args[0]) || bannedMemberInfo.find(bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase());
        if (!bannedMember) return message.channel.send("Veuillez entrer un nom d'utilisateur ou identifiant valide | L'utilisateur n'est pas banni")

        let reason = args.slice(1).join(" ")

        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("Je n'ai pas la permission de débannir un utilisateur")
        try {
            if (reason) {
                message.guild.members.unban(bannedMember.user.id, reason)
                var sembed = new MessageEmbed()
                    .setTitle('Débannissement')
                    .setColor("GREEN")
                    .addField('Membre débanni :', `${bannedMember.user.tag}`)
                    .addField('Raison:', `${reason}`)
                    .addField('Modérateur :', '➪ ' +  `${message.author.username}#${message.author.discriminator}`, true)
                    .setTimestamp()
                message.channel.send(sembed)
            } else {
                message.guild.members.unban(bannedMember.user.id, reason)
                var sembed2 = new MessageEmbed()
                     .setTitle('débannissement')
                    .setColor("GREEN")
                    .addField('Membre débanni:', `${bannedMember.user.tag}` )
                    .addField('Modérateur :', '➪ ' +  `${message.author.username}#${message.author.discriminator}`, true)
                    .setTimestamp()
                message.channel.send(sembed2)
            }
        } catch {
            
        }

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        let embed = new MessageEmbed()
            .setColor("#ff0000")
            .setThumbnail(bannedMember.user.displayAvatarURL({ dynamic: true }))
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .addField("**Moderation**", "unban")
            .addField("**Unbanned**", `${bannedMember.user.username}`)
            .addField("**ID**", `${bannedMember.user.id}`)
            .addField("**Moderator**", message.author.username)
            .addField("**Reason**", `${reason}` || "**No Reason**")
            .addField("**Date**", message.createdAt.toLocaleString())
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp();

        var sChannel = message.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send(embed)
    }

    module.exports.help = {
        name: 'unban'
    };