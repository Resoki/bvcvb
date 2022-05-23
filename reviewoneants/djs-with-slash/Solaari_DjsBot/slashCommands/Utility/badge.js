const mysql = require('mysql');
module.exports = {
  name: "badge",
  aliases: ["bdg"],
  category: "Utility",
  description: "Voir les badges des membres",
  usage: `**/badge <member>** pour voir les badges d'un membre ou **/badge**`,
  ownerOnly: false,
  options: [
    {
        name: "user",
        description: "Le nom de l'user pour voir ses badges",
        type: 6,
        required: false
    }
],
  run: async (client, interaction, args) => {
    try {
      const msg = await interaction.channel.send(` Chargement des badges... 🔃`);
      const user = interaction.options.getUser("user") || interaction.member.user
      const badges = user.flags.toArray();

        const badgesEmbed = new client.discord.MessageEmbed()
        .setTitle(`${user.username}`)
        .addField("Tes badges:", `${badges.length === 0 ? '❌ | Pas de badge trouvé' : badges}`, true)
        .setColor('RANDOM')
        .setThumbnail(user.displayAvatarURL({size: 512, dynamic: true}))
        .setFooter({ text: `Show badge`, iconURL: `${user.displayAvatarURL()}` });
        
        await msg.delete()
        await interaction.reply({ embeds: [badgesEmbed]});
    }
    catch(err){
      return interaction.channel.send(`❌ | Une erreur a eu lieu **badge.js**:\n${err}`)
    }
  },
};
