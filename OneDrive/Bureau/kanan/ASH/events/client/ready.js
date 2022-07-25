const db = require('quick.db');
const cron = require('node-cron');
const global = require('../../config');

module.exports = {
    name: 'ready',
    once: true,
    /**
     * @param {Client} client 
     */
    async execute(client) {
        // Puts an activity
        client.user.setActivity("Famille Petit 2022", {
            type: "WATCHING",
            name: "Jeux"
        });

         cron.schedule('* * * * *', async() => {
            const channel = client.channels.cache.find((ch) => ch.id === global.channelMessages);
            const phrasesList = await db.get('phrasesList')
    
            const getRandomInt = (max) => {
                return Math.floor(Math.random() * max);
            }
            const random = getRandomInt(phrasesList.length)
            channel.send(phrasesList[random].phrase)
        });
     
        
        // Send a message on the console
        console.log(`[LOG] ${client.user.tag} is now online!\n[LOG] Bot serving on Ready to serve in ${client.guilds.cache.size} servers\n[LOG] Bot serving ${client.users.cache.size} users`);
    }
}
