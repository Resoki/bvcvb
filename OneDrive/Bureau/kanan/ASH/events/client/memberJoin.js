const { MessageEmbed } = require("discord.js")
const global = require('../../config');

module.exports = {
	name: 'guildMemberAdd',
	once: false,
    async execute(message, client) {
        try {
            const channel = member.guild.channels.cache.find(channel => channel.id === global.channelJoin);
            const guild = bot.guilds.cache.get(global.guild_id);
            const userCount = guild.memberCount;
            let welcomeEmbed = new MessageEmbed().setTitle(`Ho ! Un nouveau membre  !`)
            .setDescription(`✨ Bienvenue **${member.user.username}** ✨\n sur le serveur **Famille Petit !**\n Tu es le **${userCount}** ième !`)
            .setColor('RANDOM')
            .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
            .setTimestamp()


            await member.send(`${global.messagePrivateWhenUserJoin}`);
            return channel.send({embeds: [welcomeEmbed]});
        } 
        catch(err) {
            return channel.send('Une erreur a eu lieu: ', err);
        }
	},
}