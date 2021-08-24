require('dotenv').config()

const Discord = require('discord.js');

const client = new Discord.Client();

client.commands = new Discord.Collection();

const fs = require('fs');
const { brotliCompressSync } = require('zlib');

const cdseconds = 5;

const prefix = '*'



fs.readdir('./Commandes/', (error, f) => {
    
    if (error) { return console.error(error); }

    let commandes = f.filter(f => f.split('.').pop() === 'js');

    if (commandes.length <= 0) { return console.log('Aucune commande trouvée !'); }
console.log() 


    commandes.forEach((f) => {

        let commande = require(`./Commandes/${f}`);

        console.log(`${f} commande chargée !`);

        client.commands.set(commande.help.name, commande);

    });
}); console.log()



fs.readdir('./Events/', (error, f) => {

    if (error) { return console.error(error); }

    console.log(`${f.length} events chargés`);



    f.forEach((f) => {

        let events = require(`./Events/${f}`);

        let event = f.split('.')[0];

        client.on(event, events.bind(null, client));

    }); console.log()

});
 
client.on("message", message => {

    if (message.author.bot) return false;
    
    if  (message.mentions.has(client.user.id)) {
        message.channel.send("Ta gueule, me @ plus jamais ou j'te ban")
    };
    }); console.log()

    client.on("messageCreate", message => { 
        if (message.content === 'ping') return message.reply("pong") });
    
    
    
    client.on("messageUpdate", async (oldMessage, newMessage) => {
        const embedmessageUpdate = new Discord.MessageEmbed()
            .setColor('GOLD')
            .setTitle('Un message a été modifier')
            .addField( `Messagd d'avant :`, oldMessage.content )
            .addField(`Message d'apres: `, newMessage.content)
            .setTimestamp()
        client.guilds.cache.get('833052529571004476').channels.cache.get('845280697295175690').send( embedmessageUpdate )
    });
    
    client.on("messageDelete", message => {
        const embedmessageDelete = new Discord.MessageEmbed()
            .setColor('GOLD')
            .setTitle('Un message a été supprimer')
            .addField(' message supprimé:', message.content)
            .setTimestamp()
        client.guilds.cache.get('833052529571004476').channels.cache.get('845280697295175690').send( embedmessageDelete)
    
    
    } );
    
    client.on("guildMemberAdd", member => {
        const embedmemberAdd = new Discord.MessageEmbed()
            .setColor('GOLD')
            .setTitle("Un nouveau membre a rejoins le serveur !")
            .setDescription(`bienvenue à ${member.user}`)
            .setTimestamp()
        client.guilds.cache.get('833052529571004476').channels.cache.get('845280697295175690').send( embedmemberAdd )
    
    } );
    
    client.on("guildMemberRemove", member => {
         const embedmemberRemove = new Discord.MessageEmbed()
            .setColor('GOLD')
            .setTitle("Un membre vient de quitter le serveur")
            .setDescription(` bye :wave: ${member.user}`)
            .setTimestamp()
        client.guilds.cache.get('833052529571004476').channels.cache.get('845280697295175690').send( embedmemberRemove )
    
            
    });
    
client.login(process.env.TOKEN)      
