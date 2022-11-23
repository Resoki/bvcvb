const db = require("quick.db");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "roulette",
  usage: "roulette",
  async execute(client, message, args) {
    if (!args[0]) return message.reply(`> Tu dois entrer une mise !`);
    const user = message.mentions.users.first();
    if (!args[1])
      return message.reply(
        `> Tu dois entrer un pari (noir, rouge, pair, ou impair, ou un numero entre 1 et 36) !`
      );
    const paris = args[1];
    const mise = args[0];
    dollars = await db.get(`balance_${message.author.id}.argent`);
    const userAmountDollars = await db.get(`balance_${message.author.id}.argent`);
    if (!userAmountDollars) {
      await db.set(`balance_${message.author.id}.argent`, 0);
      return message.reply(`<@${message.author.id}>, tu n'as pas d'argent !`);
    }
    if (userAmountDollars < mise) {
      const embed = new MessageEmbed().setDescription(
        `Vous êtes trop pauvre pour miser tout ça !`
      );
      return message.channel.send({ embeds: [embed] });
    }

    const turnRoulette = async (paris) => {
      await db.add(`balance_${message.author.id}.argent`, -mise);
      const embed = new MessageEmbed()
        .setTitle("La roulette est lancée, faites vos jeux !")
        .setDescription(
          `<@${message.author.id}> ouvre les paris et mise ${mise} 🪙 sur ${paris}`
        )
        .setThumbnail(
          "https://images-ext-1.discordapp.net/external/30-AJh-eOMT5o1m6EUjsmBeSfgQN4VPIqP0G3YcWrBU/https/i.imgur.com/PMwumQl.gif"
        )
        .setTimestamp();
      message.channel.send({ embeds: [embed] });

      const timeRemaining = new MessageEmbed()
        .setDescription(
          `10 secondes restantes : les jeux sont faits, rien ne va plus`
        )
        .setTimestamp();

      message.channel.send({ embeds: [timeRemaining] });

      let result;
      setTimeout(() => {
        const numberRandom = "34";
        const color = ["rouge", "noir"];
        const colorRandom = color[Math.floor(Math.random() * color.length)];
        const isPair = numberRandom % 2 === 0 ? "pair" : "impair";
        result = new MessageEmbed()
          .setTitle(
            `La roulette est tombé sur ${numberRandom} ${colorRandom}, ${isPair}`
          )
          .setTimestamp();
        
        if (paris === numberRandom) {
         db.add(`balance_${message.author.id}.argent`, mise*35);
          result.setDescription(
            `Gagnants:\n<@${message.author.id}> X35: ${
              mise * 35
            } 🪙 (bon numero)`
          );
        } else if (paris === colorRandom) {
            db.add(`balance_${message.author.id}.argent`, mise*2);
          result.setDescription(
            `Gagnants:\n<@${message.author.id}> X2: ${
              mise * 2
            } 🪙 (bonne couleur)`
          );
        } else if (paris === isPair) {
            db.add(`balance_${message.author.id}.argent`, mise*2);
          result.setDescription(
            `**Gagnants:**\n<@${message.author.id}> X2: ${
              mise * 2
            } 🪙 (${isPair})`
          );
        } else {
          result.setDescription(`<@${message.author.id}>, tu n'as pas gagné!`);
        }
        return message.channel.send({ embeds: [result] });
      }, 10000);
    };

    turnRoulette(paris, mise);
  },
};
