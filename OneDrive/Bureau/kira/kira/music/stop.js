const { QueryType } = require('discord-player');

module.exports = {
    name: 'stop',
    usage: 'stop',
    category: "owner",
    description: `Music`,
    async execute(client, message, args) {

        const queue = player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.reply(`Aucun son en cours de lecture ${message.author} ❌`);

        queue.destroy();

        message.reply(`La musique s'est arrêtée <a:yes:957097686186729562>`);

    }
}