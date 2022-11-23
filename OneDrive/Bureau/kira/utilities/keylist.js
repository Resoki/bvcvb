const config = require("../config");
const db = require("quick.db");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "keylist",
  usage: "keylist",
  alias: "keylist",
  description: `Voir les cle stocké !`,
  async execute(client, message, args) {
    try {
      const keys = db.get(`keyApi_simsimi`);
      if (!keys) {
        return message.reply(`> Tu n'as pas de clé stocké !`);
      }

      const embed = new MessageEmbed()
        .setTitle("Cle ajouté !")
        .setDescription(`La liste des keys ci dessous, nombre de key(s): ${keys.length}`)
        .setColor('AQUA')
        .setTimestamp();

      keys.forEach((key, index) => {
        embed.addField(`${index + 1}`, `${key}`);
      });

      return message.channel.send({ embeds: [embed] });
    } catch (err) {
        console.log(err)
      return message.channel.send(
        `Une erreur avec simsimi a eu lieu ! Merci de regarder la console`,
        err
      );
    }
  },
};
