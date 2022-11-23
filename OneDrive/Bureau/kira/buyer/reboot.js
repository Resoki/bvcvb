const config = require("../config");

module.exports = {
  name: "reboot",
  usage: "reboot",
  description: `Permet de redémarrer le bot.`,
  async execute(client, message, args) {
    if (
      config.app.owners.includes(message.author.id) ||
      config.app.funny.includes(message.author.id) === true
    ) {
      message.channel
        .send("> Reboot en cours ...")
        .then(async (message) => {
          message.edit("> Reboot en cours ...");
          client.destroy();
          await client.login(config.app.token);
          await message.edit(
            "<a:loading:957097853694664746> Reboot en cours ..."
          );
          message.edit("> Reboot terminé, bot redemarré !");
        });
    }
  },
};
