const Discord = require('discord.js');

const api = require('novelcovid');

module.exports.run = async (client, message, args) => {

    
        const corona = await api.all();


        const embed = new Discord.MessageEmbed()
        .setTitle(`Worldwide`)
        .setDescription(`Info on COVID-19`)
        .addField('Total Confirmed', corona.cases, true)
        .addField('Total Deaths', corona.deaths, true)
        .addField('Total Recovered', corona.recovered, true)
        .addField('Today\'s cases', corona.todayCases, true)
        .addField('Today\'s deaths', corona.todayDeaths, true)
        .addField('Active cases', corona.active, true)
        .addField('Critical cases', corona.critical, true)
        .setFooter(`Thanks for using ${client.user.username}`, client.user.displayAvatarURL())
        .setColor('RED')

        message.channel.send(embed);

    }

    module.exports.help = {
        name: "global"
    }