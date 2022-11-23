
const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: "anime",
  usage: "anime",
  async execute(client, message, args) {
    if(!args[0]) return message.reply('Tu dois indiquer un element de recherche')
    let link = `https://kitsu.io/api/edge/anime?filter[text]=${args[0]}`;

   await axios.get(link)
   .then((res)=> {
    res.data.data.slice(0,3).forEach((el, index)=> {
      if(index === 2) return;
    // embedGenerator(el.type,el.attributes.synopsis, el.attributes.coverImage.small)

    let sino = el.attributes.synopsis.slice(0,120)
        const embed = new MessageEmbed()
        .setTitle(`${el.attributes.subtype === 'TV' ? 'TV 📺' : 'Book 📖'} -${el.attributes.titles.en}`)
        .setDescription(`**Type =>** ${el.type}\n**Synopsis =>** *${sino}*\n⭐ ${el.attributes.averageRating}%\n🔗 [Acceder au site](${el.links.self})`)
        .setTimestamp()
        .setImage(!el.attributes.coverImage ? el.attributes.posterImage.large : el.attributes.coverImage.large)
        .setColor('#f2f2f2')
        message.channel.send({embeds: [embed]});
    });
   })
  },
};
