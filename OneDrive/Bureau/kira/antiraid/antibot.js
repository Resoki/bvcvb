const Discord = require("discord.js");
const config = require("../config");
const db = require("quick.db");
const owner = new db.table("Owner");
const p = new db.table("Prefix");
const cl = new db.table("Color");
const atb = new db.table("Antibot");

module.exports = {
  name: "antibot",
  usage: "antibot",
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
        atb.set(`config.${message.guild.id}.antibot`, true);
        const embed = new Discord.MessageEmbed()
          .setDescription(`> **L'antibot** est maintenant **activé**`)
          .setColor(color);
        message.channel.send({ embeds: [embed] });
      } else if (args[0] == "off" || args[0] == "OFF") {
        atb.set(`config.${message.guild.id}.antibot`, false);
        const embed = new Discord.MessageEmbed()
          .setDescription(`> **L'antibot** est maintenant **désactivé**`)
          .setColor(color);
        message.channel.send({ embeds: [embed] });
      } else {
        return message.reply(`> Paramètres invalide`);
      }
    }
  },
};
