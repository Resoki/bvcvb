const config = require("../config");
const footer = config.app.footer;
const axios = require('axios')
const {MessageEmbed} =require('discord.js');


module.exports = {
  name: "randomuser",
  usage: "randomuser",
  description: `jeux`,
  async execute(client, message, args) {
   try {
    let firstname = '';
    let lastname = '';
    let gender = '';
    let picture ='';
    let nat = '';
    let location_city = '';
    let location_state = '';
    await axios.get('https://randomuser.me/api')
    .then((res)=> {
      if(!res.data) return message.channel.send('Trop de requete, veuillez attendre');
      firstname = res.data.results[0].name.first;
      lastname = res.data.results[0].name.last;
      gender = res.data.results[0].gender;
      picture = res.data.results[0].picture.thumbnail;
      nat =  res.data.results[0].nat;
      location_city =  res.data.results[0].location.city;
      location_state =  res.data.results[0].location.state;
    });
    const embed = new MessageEmbed()
    .setTitle(`${firstname} ${lastname}`)
    .setDescription(`Gender => ${gender === 'female' ? '♀️' : '♂️'}\n Nationalité => ${nat}\nCity => ${location_city}\nPays => ${location_state} `)
    .setThumbnail(picture)
    .setColor('#f1f1f1')
    .setTimestamp();

    return message.channel.send({embeds: [embed]})

   }
   catch(err) {
    return console.log(err)
   }
  },
};
