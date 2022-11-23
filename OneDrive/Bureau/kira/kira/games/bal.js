const db = require("quick.db");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "bal",
  usage: "bal",
  async execute(client, message, args) {
    const user = message.mentions.users.first();
    let dollars = null;
    if(!user) {
        dollars = await db.get(`balance_${message.author.id}.argent`);
    }
    if(user) {
        dollars = await db.get(`balance_${user.id}.argent`);
    }

    const embed = new MessageEmbed()
    .setTitle('Balance')
    .setDescription(`<@${!user ? message.author.id : user.id}>, tu as ${!dollars ? '0' : dollars} $ !`);

    return message.channel.send({embeds: [embed]})
  },
};
