module.exports = {
    name: "og",
    options: [
        {
            name: "user",
            description: "Donne le rôle 951939496658731028 au membre visé + logs l'action ici : 951939496658731028",
            type: 6,
            required: true
        }
    ],
    category: "Utility",
    description: "Commande Og",
    userPerms: ["SEND_MESSAGES"],
    usage:'**/og <member>**',
    ownerOnly: false,
    run: async (client, interaction, args) => {
        let user = interaction.options.getUser("user");
        let userToMember = interaction.guild.members.cache.get(user.id);
        const tabRole = ['951935257047879680','956152220536152115', '951939066973286481'];

        return interaction.reply({ content: `Rôle **og** added à <@${userToMember.user.id}>` });

       
    }
}