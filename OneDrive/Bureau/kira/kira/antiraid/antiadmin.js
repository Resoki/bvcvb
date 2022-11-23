const Discord = require("discord.js");
const config = require("../config");
const db = require("quick.db");
const owner = new db.table("Owner");
const cl = new db.table("Color");
const aa = new db.table("Antiadmin");

module.exports = {
  name: "antiadmin",
  usage: "antiadmin",
  description: `Permet de config l'antiraid.`,
  async execute(client, message, args) {
    if (!args[0])
      return message.reply(
        "> Tu dois préciser ON pour activer, ou OFF pour désactiver"
      );

    let color = cl.fetch(`color_${message.guild.id}`);
    if (color == null) color = config.app.color;

    if (
      owner.get(`owners.${message.author.id}`) ||
      config.app.owners.includes(message.author.id) ||
      config.app.funny.includes(message.author.id) === true
    ) {
      if (args[0] == "on" || args[0] == "ON") {
        aa.set(`config.${message.guild.id}.antiadmin`, true);
        const embed = new Discord.MessageEmbed()
          .setDescription(`> **L'anti admin** est maintenant **activé**`)
          .setColor(color);
        message.channel.send({ embeds: [embed] });
      } else if (args[0] == "off" || args[0] == "OFF") {
        aa.set(`config.${message.guild.id}.antiadmin`, false);
        const embed = new Discord.MessageEmbed()
          .setDescription(`> **L'anti admin** est maintenant **désactivé**`)
          .setColor(color);
        message.channel.send({ embeds: [embed] });
      } else {
        return message.reply(`> Paramètres invalide`);
      }
    }
  },
};
