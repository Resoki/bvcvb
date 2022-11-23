const Discord = require("discord.js");
const db = require("quick.db");
const owner = new db.table("Owner")
const pgp = new db.table("PermGp")
const cl = new db.table("Color")
const config = require("../config")

module.exports = {
    name: 'pwebhooks',
    usage: 'pwebhooks',
    description: `Permet de Désactive toutes les permissions webhooks du serveur.`,
    async execute(client, message, args) {

        if (owner.get(`owners.${message.author.id}`) || message.member.roles.cache.has(pgp.fetch(`permgp_${message.guild.id}`)) || config.app.owners.includes(message.author.id) || config.app.funny.includes(message.author.id) === true) {

            let color = cl.fetch(`color_${message.guild.id}`)
            if (color == null) color = config.app.color

            const roles = message.guild.roles.cache.filter(role => role.permissions.any(["MANAGE_WEBHOOKS"]));
            roles.forEach(role => role.setPermissions(role.permissions.remove(["MANAGE_WEBHOOKS"])).catch(() => { }))

            const permEmbed = new Discord.MessageEmbed()
                .setDescription('**Je désactive les permissions WEBHOOKS à tous les rôles.**')
                .setColor(color)

            message.channel.send({ embeds: [permEmbed] })
            let roleping = db.get(`role_${message.guild.id}`)
            if (roleping === null) roleping = "@everyone"

            const embed = new Discord.MessageEmbed()
                .setTitle(`${message.author.tag} à désactivé toutes les __permissions webhooks__ du serveur`)
                .setDescription(`Merci de patienter avant de réactiver les permissions le temps que le problème soit réglé\n Executeur : <@${message.author.id}>`)
                .setTimestamp()
                .setColor(color)
                .setFooter({ text: `📚` })
            client.channels.cache.get(config.app.channelLogs).send({ content: `${roleping}`, embeds: [embed] }).catch(console.error)

        }
    }
}