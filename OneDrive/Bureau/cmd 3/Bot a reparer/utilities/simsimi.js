const config = require("../config");
const simsimi = require("simsimi")({ key: config.app.simsimiKey });

module.exports = {
  name: "simsimi",
  usage: "simsimi",
  description: `Discuter avec le bot simsimi`,
  async execute(client, message, args) {
    try {
      if (!args[0]) return message.reply(`Tu dois entrer la phrase à dire à simsimi ! ex: **+simsimi salut ca va ?**`);
      let text = message.content.replace("+simsimi ", "");
      simsimi(text).then(async (response) => {
        await message.channel.send(`${response}`);
      });
    } catch (err) {
      return message.channel.send(`Une erreur avec simsimi a eu lieu ! Merci de regarder la console`, err)
    }
  },
};
