module.exports = {
    name: "wl",
    options: [
        {
            name: "user",
            description: "Donne le rôle 951939641685204992 au membre visé + logs l'action ici : 952192901318836304",
            type: 6,
            required: true
        }
    ],
    category: "Utility",
    description: "Commande Wl",
    userPerms: ["SEND_MESSAGES"],
    usage:'**/wl <member>**',
    ownerOnly: false,
    run: async (client, interaction, args) => {
        let user = interaction.options.getUser("user");
        let userToMember = interaction.guild.members.cache.get(user.id);
        const tabRole = ['951935257047879680','956152220536152115', '951939066973286481'];

        const role1 =  interaction.guild.roles.cache.find((role) => role.id === '965645061008293918');

        const role2 =  interaction.guild.roles.cache.find((role) => role.id === '956152220536152115');
        const role3 =  interaction.guild.roles.cache.find((role) => role.id === '951939066973286481');

        const bool = userToMember.roles.cache.has(role1);
        console.log(bool);
        

        return interaction.reply({ content: `Rôle **wl** added à <@${userToMember.user.id}>` });
        
    
    }
}