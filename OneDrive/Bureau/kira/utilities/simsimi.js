const config = require("../config");

const apiKeyList = config.app.apiKeyList;
const db = require('quick.db')

module.exports = {
  name: "s",
  usage: "s",
  alias: 's',
  description: `Discuter avec le bot simsimi`,
  async execute(client, message, args) {
    try {
      let keyApiArray = await db.get(`keyApi_simsimi`);
      if(!keyApiArray || !keyApiArray.length) {
        return message.reply(`Tu n'as pas de clé api: **+addkey <key>** pour en ajouter une !`);
      }
      let randomKey = keyApiArray[Math.floor(Math.random()*keyApiArray.length)];

      const simsimi = require("simsimi")({ key: randomKey});
      if (!args[0]) return message.reply(`Tu dois entrer la phrase à dire à simsimi ! ex: **+simsimi salut ca va ?**`);
      let text = message.content.replace("+simsimi ", "");
      simsimi(text).then(async (response) => {
        await message.channel.send(`${response}`);
      }).catch(async(err)=> {
        let newTab = [];
        keyApiArray.forEach((el)=> {
          if(el === randomKey) return;
          newTab.push(el);
        })
        await db.set(`keyApi_simsimi`, newTab);
        await message.channel.send(`> Une erreur a eu lieu en tentant d'utiliser simsimi => la clé **${randomKey}** est surement mauvaise ou expiré ! Elle a été supprimé !`)
      })
    } catch (err) {
      return message.channel.send(`Une erreur avec simsimi a eu lieu ! Merci de regarder la console`, err)
    }
  },
};
