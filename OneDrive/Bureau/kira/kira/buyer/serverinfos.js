const { MessageEmbed } = require("discord.js");
const moment = require('moment')

module.exports = {
  name: "serverinfos",
  usage: "serverinfos",
  description: `Infos du serveur`,
  async execute(client, message, args) {
    const embed = new MessageEmbed()
      .addField("Name", message.guild.name, true)
      .addField(
        "Members",
        `${message.guild.memberCount} members\n${
          message.guild.memberCount
        } humans\n${
          message.guild.members.cache.filter((member) => member.user.bot).size
        } bots`,
        true
      )
      .addField(
        "Channels",
        `${message.guild.channels.cache.size} channels\n${
          message.guild.channels.cache.filter(
            (channel) => channel.type === "text"
          ).size
        } text chat\n${
          message.guild.channels.cache.filter(
            (channel) => channel.type === "voice"
          ).size
        } voice chat\n${
          message.guild.channels.cache.filter(
            (channel) => channel.type === "category"
          ).size
        } categories`,
        true
      )
    // .addField("Roles", message.guild.roles.cache.size, true)
  //    .addField("Owner", message.guild.owner, true)
      .addField(
        "Date de création",
        moment(message.guild.createdAt).format(
          "[The] DD/MM/YYYY [at] HH:mm:ss"
        ),
        true
      )
      .addField(
        "Nitro boost",
        `Level : ${message.guild.premiumTier}\nBoost(s) : ${message.guild.premiumSubscriptionCount}`,
        true
      )
      .setFooter(`ID : ${message.guild.id}`)
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setImage(message.guild.bannerURL())
      .setTitle("Informations de " + message.guild.name);

    await message.channel.send({ embeds: [embed] });
  },
};
