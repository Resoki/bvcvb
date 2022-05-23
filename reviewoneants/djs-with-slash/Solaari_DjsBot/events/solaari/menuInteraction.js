const { MessageEmbed } = require("discord.js")

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {   
     try {
         if(!interaction.isSelectMenu()) return
        if(interaction.values[0] === 'select_one'){
            const embed = new MessageEmbed()
            .setTitle('Solaari 2022')
            .setDescription('One')
            .setColor('RANDOM');
            
            return interaction.reply({content: 'One', ephemeral: true})
        }
        if(interaction.values[0] === 'select_two'){
            return interaction.reply({content: 'Two', ephemeral: true})
        }
        if(interaction.values[0] === 'select_three'){
            return interaction.reply({content: 'Three', ephemeral: true})
        }
        
     }
     catch(err){
         return interaction.reply({content: `Une erreur a eu lieu`, ephemeral: true})
     }
    }
}
