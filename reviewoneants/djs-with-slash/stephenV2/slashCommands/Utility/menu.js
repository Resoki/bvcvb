// Example of how to make a SlashCommand
const { MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: "menu",
    category: "Utility",
    description: "Afficher le menu du bot",
    usage: '**/ping**',
    userPerms: ["SEND_MESSAGES"],
    ownerOnly: false,
    run: async (client, interaction) => {
        if(!interaction.isCommand()) return;

        const menuEmbed = new client.discord.MessageEmbed()
        .setTitle(`Solaari Bot - Menu `)
        .addField("Infos ℹ", `Bonjour, je suis le bot d'assitance, en cas de problème n'hesite pas à ouvrir un ticket => <#956597022268473424>\nTu peux faire un choix ci dessous dans le menu pour obtenir des informations !`, true)
        .setColor('YELLOW')
        .setImage('https://www.solaari.com/wp-content/uploads/2020/05/A.png')
        .setThumbnail('https://yt3.ggpht.com/a/AATXAJzcDEAn-ciE6a1UQfwsJeic4EjECMOQPuqxnQ=s900-c-k-c0xffffffff-no-rj-mo')
        .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

        const selectMenu = new MessageActionRow()
        .addComponents(
        new MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('Séléctionnez une option')
            .addOptions([
                {
                    label: 'Titre 1 💸' ,
                    value: 'select_one',
                },
                {
                    label: 'Titre 2🎁',
                    value: 'select_two',
                },
                {
                    label: 'Titre 3 ♾️',
                    value: 'select_three',
                },
            ]),
        );        

        await interaction.reply({ embeds: [menuEmbed], components: [selectMenu] });

    },
};
