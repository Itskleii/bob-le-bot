const superagent = require("node-fetch");
const Discord = require('discord.js')

const rp = require('request-promise-native');

module.exports = {
    name: "ass",
    category: "NSFW",
  description: "Sends ass",
  run: async (client, message, args, level) => {
      message.delete()
  //command

  //Checks channel for nsfw
  var errMessage = "Ce n'est pas un salon NSFW";
  if (!message.channel.nsfw) {
      message.react(':anger:');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }

  return rp.get('http://api.obutts.ru/butts/0/1/random').then(JSON.parse).then(function(res)  {
    return rp.get({
        url:'http://media.obutts.ru/' + res[0].preview,
        encoding: null
    });
}).then(function(res)   {

const ass = new Discord.MessageEmbed()
      .setTitle("Ass")
      .setColor(`#FF0000`)
      .setImage("attachment://file.png").attachFiles([{ attachment: res, name: "file.png" }])


    message.channel.send(ass);
});
  }
  };

      
  module.exports.help = {
    name: "ass"
}
