const Discord = require("discord.js");
const config = require("../config");
const db = require("quick.db");
const cl = new db.table("Color");
const pfp = new db.table("Pfp");
const chalk = require("chalk");

module.exports = {
  name: "ready",
  once: true,

  async execute(client) {
    console.log(chalk.green.bold(`--------------------------------------`));
    console.log(chalk.green(`Le bot `) + chalk.green.bold(`${client.user.username}`) + chalk.green(' est connecté !'));
    console.log(
      chalk.blue(`Client ID: `) +
      chalk.blue.bold(`${client.user.id}\n`) +
        chalk.blue(`Lien pour inviter le bot sur le serveur: https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=0`)
    );
    console.log(chalk.green.bold(`--------------------------------------`));

    setInterval(() => {
      client.guilds.cache.forEach(async (guild) => {
        let color = cl.fetch(`color_${guild.id}`);
        if (color == null) color = config.app.color;

        const channelId = pfp.get(`${guild.id}.channelpfp`);
        if (!channelId) return;
        const channel = guild.channels.cache.get(channelId);
        if (!channel) return;
        const user = client.users.cache.random();
        const embed = new Discord.MessageEmbed({
          footer: { text: user.username },
        })
          .setTitle("Pfp")
          .setURL("https://discord.gg/FAZgBcCj3t")
          .setImage(
            user.displayAvatarURL({ dynamic: true, format: "png", size: 512 })
          )
          .setColor(color);
        const button = new Discord.MessageButton()
          .setLabel("Avatar")
          .setURL(
            user.displayAvatarURL({ dynamic: true, format: "png", size: 512 })
          )
          .setStyle("LINK");
        const row = new Discord.MessageActionRow().addComponents(button);
        channel.send({ embeds: [embed], components: [row] });
      });
    }, ms("30s"));
  },
};
