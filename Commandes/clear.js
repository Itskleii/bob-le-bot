const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
let msg;
let amount = args[0];

if (!amount || Number.isNaN(parseInt(amount, 10)) || parseInt(amount, 10) < 1 || parseInt(amount, 10) > 100) {
  msg = await message.channel.send('Vous devez préciser un nombre de messages à supprimer entre 1 et 100 !');

  setTimeout(() => {
    msg.delete().catch(() => {});
  }, 5000);
}

await message.delete().catch(() => {});

let messages = await message.channel.messages.fetch({ limit: 100 });
messages = [...messages.values()];

if (messages.length > amount) {
  messages.length = parseInt(amount, 10);
}

messages = messages.filter((m) => !m.pinned);

amount = parseInt(amount, 10) + 1;

message.channel.bulkDelete(messages, true);

msg = await message.channel.send(`**${parseInt(amount, 10) - 1}** messages supprimés !`);

return setTimeout(() => {
  msg.delete().catch(() => {});
}, 3000);
 } 

module.exports.help = {
    name: 'clear'
}; 
