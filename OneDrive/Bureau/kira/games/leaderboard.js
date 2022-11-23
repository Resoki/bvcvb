const db = require("quick.db");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "leaderboard",
  usage: "leaderboard",
  async execute(client, message, args) {
    let memberBalance = [];
    const allMembers = await db.all("balance_");
    allMembers.forEach((el)=> {
        if(el.ID.startsWith('balance_')) memberBalance.push(el);
    })
    const embed = new MessageEmbed().setTitle(
      "Classement des meilleurs joueurs"
    );
    
    memberBalance.sort((a, b)=> {
        return a.data.argent - b.data.argent;
    }).reverse()
    let str = '';
    memberBalance.forEach((user, index) => {
     str += `${index+1} - **${user.data.username}**: ${user.data.argent} 🪙\n`
    });
    embed.setDescription(str);

    message.channel.send({ embeds: [embed] });
  },
};
