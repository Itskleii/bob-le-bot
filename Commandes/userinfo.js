const Discord = require("discord.js")
const moment = require('moment');

module.exports.run = async (client, message, args) => {
    message.delete()
	let user;

	if(!args.length) {
		user = message.author;
	} else {
		user = message.mentions.users.first() || client.users.cache.get(args[0]) || client.users.cache.find(u => u.username.toLowerCase().includes(args[0].toLowerCase()));
	};

	if(!user || !message.guild.member(user)) return message.channel.send('⚠️ Cet utilisateur n\'existe pas !');

    const member = message.guild.member(user);

    let clientStatus = user.presence.clientStatus;

    if(clientStatus === null) clientStatus = 'Inconnu';
    if(clientStatus.desktop) clientStatus = 'Ordinateur';
    else if(clientStatus.web) clientStatus = 'Web';
    else if(clientStatus.mobile) clientStatus = 'Téléphone';
    else clientStatus = "Inconnu";

    const roles = member.roles.cache.sort((a, b) => b.position - a.position).filter(role => role.id !== message.guild.roles.everyone.id).map(role => role.toString());
    let reste = roles.splice(0, 29).join(", ");

    if(reste.length > 300) reste = reste.substr(0, 310) + " et plus...";

    let userStatus = user.presence.status;
    switch (userStatus) {
      	case "online": {
        	userStatus = `$En ligne`;
        	break;
      	};
      	case "offline": {
        	userStatus = `Hors-ligne`;
        	break;
      	};
      	case "idle": {
        	userStatus = ` Inactif`;
        	break;
      	};
      	case "dnd": {
        	userStatus = `Ne pas déranger`;
        	break;
      	};
    };

    let userActivity = user.presence.activities[0];
    let toDisplay = "";
    if(userActivity) {
        if(userActivity.name !== "Custom Status") {
            switch (userActivity.type) {
                case "PLAYING": toDisplay = 'Joue à '; break;
                case "LISTENING": toDisplay = 'Écoute '; break;
                case "WATCHING": toDisplay = 'Regarde '; break;
                case "COMPETING": toDisplay = 'Participant à: '; break;
                case "STREAMING": toDisplay = 'Streame '; break;
            };

            toDisplay+= userActivity.name;
        } else {
            toDisplay = `${userActivity.emoji ? userActivity.emoji : ""} ${userActivity.state ? userActivity.state : ""}`
        }
    }

   
    var embedSaying = new Discord.MessageEmbed()
    .setColor("RED")
    .setFooter(`Information demandée par ${message.author.tag}`)
    .setTitle("🔎 Information sur l'utilisateur")
    .addFields(
        {
            name: "**ℹ️ Nom d'utilisateur**",
            value: `${user.tag}`,
            inline: true,
        },{
            name: "🆔 Identifiant d'utilisateur",
            value: `${user.id}`,
            inline: true,
        },{
            name: '\u200b',
            value: '\u200b',
            inline: true,
        },{
            name: "**👤 Pseudonyme sur le serveur**", 
            value: `${member.nickname ? member.nickname : 'aucun'}`,
            inline: true,
        },{
            name: "**🤖 BOT ?**",
            value: `${user.bot ? "Oui" : "Non"}`,
            inline: true,
        },{
            name: "**🎭 Roles**",
            value: `${member.roles.cache.size > 1 ? reste : "Aucun rôle"}`,
            inline: true,
        },{
            name: "**📱 Activité**",
            value: `${toDisplay.length > 1 ? toDisplay : "Aucune activité en cours"}`,
            inline: true,
        },{
            name: "**📡 Status**",
            value: `${userStatus}`,
            inline: true,
        },{
            name: '**🖥️ Client**',
            value: ` ${clientStatus}`,
            inline: true,
        },{
            name: '\u200b',
            value: '\u200b',
            inline: true,
        },{
            name: "**📅 Création du compte**",
            value: `${moment(user.createdAt).locale('fr').format('llll')}`,
            inline: true,
        },{
            name: "**📥 Rejoint le**",
            value: `${moment(member.joinedAt).locale('fr').format('llll')}`,
            inline: true,
        },
    )   
   
   
   
 message.channel.send(embedSaying)
        
    
}


module.exports.help = {
    name:"userinfo",
    aliases: ["userinfo", "ui","user-info"],
}