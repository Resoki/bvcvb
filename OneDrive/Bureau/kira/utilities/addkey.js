const config = require("../config");
const db = require('quick.db');
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "addkey",
  usage: "addkey",
  alias: 'addkey',
  description: `Ajouter une clé api à simsimi`,
  async execute(client, message, args) {
    try {
        if(!args[0]) return message.reply(`> Tu dois renseigner une clé API`);
        const keyApi = args[0];
        await db.push(`keyApi_simsimi`, keyApi)
        const embed = new MessageEmbed()
        .setTitle('Cle ajouté !')
        .setDescription(`La clé **${keyApi}** a bien été ajouté !`)
        .setColor('AQUA')
        .setTimestamp()

        return message.channel.send({embeds: [embed]})

    } catch (err) {
        console.log(err)
      return message.channel.send(`Une erreur avec simsimi a eu lieu ! Merci de regarder la console`, err)
    }
  },
};
