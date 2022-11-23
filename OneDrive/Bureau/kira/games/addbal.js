const db = require("quick.db");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "addbal",
  usage: "addbal",
  async execute(client, message, args) {
    if(!args[0]) return message.reply(`Tu dois entrer un membre !`);
    const user = message.mentions.users.first();
    if(!args[1]) return message.reply(`Tu dois entrer un montant d'argent à donner !`);
    const dollars = parseInt(args[1]);
    const userHasDollars = await db.get(`balance_${user.id}`);
    if(!userHasDollars) {
        await db.set(`balance_${! user? message.author.id : user.id}`, {
          username: !user ? message.author.username : user.username,
          argent: 0
        });
    }

    await db.add(`balance_${user.id}.argent`, dollars);

    const embed = new MessageEmbed()
    .setTitle('Balance')
    .setDescription(`<@${user.id}>, tu viens de recevoir ${dollars} de la part de <@${message.author.id}>`);
    message.channel.send({embeds: [embed]})
  },
};
