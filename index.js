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

     client.on("message", message => { 
        if (message.content === 'ping') return message.reply("pong") });
    
    
    
client.login(process.env.TOKEN)      
