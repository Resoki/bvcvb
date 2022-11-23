const db = require("quick.db");
const { MessageEmbed } = require("discord.js");
const ms = require('ms');

module.exports = {
  name: "bank",
  usage: "bank",
  async execute(client, message, args) {
    const userHasDollars = await db.get(`balance_${message.author.id}`);
    if(!userHasDollars) {
        await db.set(`balance_${message.author.id}`, {
          username: message.author.username,
          argent: 0
        });
    }

    let timeout = 86400000;
    let amount = 1000;

    const daily = await db.get(`dateclaim_${message.author.id}`);
    if(daily && timeout - (Date.now() - daily) >0 ) {
        let time = ms(timeout - (Date.now() - daily));
        message.channel.send(`> Tu as déjà recolté tes points aujourd'hui Tu peux les reclamer dans **${time}**!`)
    } else {
        const embed = new MessageEmbed()
        .setTitle(`Daily ! ${message.author.username}`)
        .setDescription(`Tu viens de recevoir ${amount} $ !`);
        message.channel.send({embeds: [embed]});

        await db.add(`balance_${message.author.id}.argent`, amount);
        await db.set(`dateclaim_${message.author.id}`, Date.now());
    }
  },
};
