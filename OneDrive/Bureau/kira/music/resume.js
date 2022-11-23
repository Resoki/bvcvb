const Discord = require("discord.js");
const db = require("quick.db");
module.exports = {
  name: "resume",
  usage: "resume",
  category: "owner",
  description: `Music`,
  async execute(client, message, args) {
    const queue = player.getQueue(message.guild.id);

    if (!queue)
      return message.channel.send(
        `Aucun son en cours de lecture ${message.author} ❌`
      );

    const success = queue.setPaused(false);

    return message.channel.send(
      success
        ? `Musique actuelle ${queue.current.title} a repris <a:yes:957097686186729562>`
        : `Quelque chose s'est mal passé ❌`
    );
  },
};
