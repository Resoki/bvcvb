const Discord = require("discord.js");
const config = require("../config");
const db = require("quick.db");
const owner = new db.table("Owner");
const p = new db.table("Prefix");
const cl = new db.table("Color");
const aw = new db.table("antiwebhook");

module.exports = {
  name: "antiwebhook",
  usage: "antiwebhook",
  description: `Permet de config l'antiraid.`,
  async execute(client, message, args) {
    if (!args[0])
      return message.reply(
        "Tu dois préciser ON pour activer, ou OFF pour désactiver"
      );
    let color = cl.fetch(`color_${message.guild.id}`);
    if (color == null) color = config.app.color;

    if (
      owner.get(`owners.${message.author.id}`) ||
      config.app.owners.includes(message.author.id) ||
      config.app.funny.includes(message.author.id) === true
    ) {
      if (args[0] == "on" || args[0] == "ON") {
        aw.set(`config.${message.guild.id}.antiwebhook`, true);
        const embed = new Discord.MessageEmbed()
          .setDescription(`**L'antiwebhook** est maintenant **activé**`)
          .setColor(color);
        message.channel.send({ embeds: [embed] });
      } else if (args[0] == "off" || args[0] == "OFF") {
        aw.set(`config.${message.guild.id}.antiwebhook`, false);
        const embed = new Discord.MessageEmbed()
          .setDescription(`**L'antiwebhook** est maintenant **désactivé**`)
          .setColor(color);
        message.channel.send({ embeds: [embed] });
      } else {
        return message.reply(`Paramètres invalide`);
      }
    }
  },
};
