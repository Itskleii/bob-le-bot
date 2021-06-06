const Discord = require('discord.js')

module.exports.run = async (client, message, args) => {

  const iplist = [
    "95.220.78.166",
    "65.48.16.41",
    "144.119.230.125",
    "222.150.110.233",
    "31.170.117.153",
    "161.59.109.68",
    "196.205.106.128",
    "81.87.247.114",
    "126.174.224.39",
    "17.25.238.85",
    "60.80.149.54",
    "18.86.166.111",
    "243.121.42.204",
    "177.204.169.150",
    "251.136.207.188",
  ]
  message.delete()
  const user = message.mentions.users.first();
  if(!user) return message.channel.send("Mentionnez un utilisateur !")
  const ip = iplist[Math.floor(Math.random() * iplist.length)]
  message.channel.send(`**Attaque DDOS en cours sur <@${user.id}> :warning:**`).then(async msg => {
    setTimeout(() => {
      msg.edit('░░░░░░░░░░ 0%');
    }, 1000);
    setTimeout(() => {
      msg.edit('▓▓░░░░░░░░ 20%');
    }, 1500);
    setTimeout(() => {
      msg.edit('▓▓▓▓░░░░░░ 40%');
    }, 2000);
    setTimeout(() => {
      msg.edit('▓▓▓▓▓▓░░░░ 60%');
    }, 2500);
    setTimeout(() => {
      msg.edit('▓▓▓▓▓▓▓▓░░ 80%');
    }, 3000);
    setTimeout(() => {
      msg.edit('▓▓▓▓▓▓▓▓▓▓ 100%');
    }, 3500);
    setTimeout(() => {
      msg.edit('Ip trouvé !');
    }, 4000);
    setTimeout(() => {
      msg.edit(`l'ip de <@${user.id}> est ` + ip);
    }, 4500);
  });
  message.channel.send(`> lancement de l'attaque DDOS sur <@${user.id}>`)
};

module.exports.help = {
    name: "ddos"
}