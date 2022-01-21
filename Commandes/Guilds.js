const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {

    if (!message.guild.members.cache.get(message.author.id).permissions.has('ADMINISTRATOR')) { return message.channel.send("vous devez avoir la permission administrateur")}

    let i0 = 0;
        let i1 = 10;
        let page = 1;

        let description = 
        `Serveur : ${client.guilds.cache.size}\n\n`+
        client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
            .map((r, i) => `**${i + 1}** - ${r.name}`)
            .slice(0, 10)
            .join("\n");

        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL())
            .setFooter(client.user.username, client.user.displayAvatarURL())
            .setTitle(`Page : ${page}/${Math.ceil(client.guilds.cache.size/10)}`)
            .setDescription(description);

        const msg = await message.channel.send(embed);
        
        await msg.react("⬅");
        await msg.react("➡");
        await msg.react("❌");

        const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

        collector.on("collect", async(reaction) => {

            if(reaction._emoji.name === "⬅") {
                i0 = i0-10;
                i1 = i1-10;
                page = page-1;
                if(i0 < 0){
                    return msg.delete();
                }
                if(!i0 || !i1){
                    return msg.delete();
                }
                
                description = `Serveur : ${client.guilds.cache.size}\n\n`+
                client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
                    .map((r, i) => `**${i + 1}** - ${r.name}`)
                    .slice(i0, i1)
                    .join("\n");

                embed.setTitle(`Page: ${page}/${Math.round(client.guilds.cache.size/10)}`)
                    .setDescription(description);
                msg.edit(embed);
            
            }

            if(reaction._emoji.name === "➡"){

                // Updates variables
                i0 = i0+10;
                i1 = i1+10;
                page = page+1;

                if(i1 > client.guilds.cache.size + 10){
                    return msg.delete();
                }
                if(!i0 || !i1){
                    return msg.delete();
                }

                description = `Serveur : ${client.guilds.cache.size}\n\n`+
                client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
                    .map((r, i) => `**${i + 1}** - ${r.name} |`)
                    .slice(i0, i1)
                    .join("\n");

                embed.setTitle(`Page: ${page}/${Math.round(client.guilds.cache.size/10)}`)
                    .setDescription(description);
                msg.edit(embed);

            }

            if(reaction._emoji.name === "❌"){
                return msg.delete(); 
            }
            await reaction.users.remove(message.author.id);
        });
}

module.exports.help = {
    name: "guilds"
}
