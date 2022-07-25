const { MessageEmbed, Permissions } = require('discord.js');
module.exports = {
  name: "say",
  aliases: ["arole"],
  category: "Utility",
  description: "Faire dire un mot au bot",
  usage: `**/say <word"**`,
  ownerOnly: false,
  options: [
    {
        name: 'word',
        description: `Le mot à envoyer`,
        type: 3,
        required: true
    },
],
  run: async (client, interaction, args) => {
    try {
      const permission = interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS);
      
    if (!permission)
      return interaction.reply(`❌ | Tu n'as pas la permission d'utiliser cette commande !`);
    
    const word = interaction.options.getString('word')

    await interaction.channel.send(word)
    
    }
    catch(err){
      return interaction.channel.send(`❌ | Une erreur a eu lieu **say.js**:\n${err}`);
    }
  },
};
