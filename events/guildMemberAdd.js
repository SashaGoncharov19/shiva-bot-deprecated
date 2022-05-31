const {MessageEmbed} = require('discord.js')
const {newbie_channel_id, newbie_role_id} = require('../config.json');

module.exports = {
    name: "guildMemberAdd",

    execute(client) {
        const adminRoleID = client.guild.roles.cache.find(role => role.id == newbie_role_id)
        const welcomeChannel = client.guild.channels.cache.find(channel => channel.id == newbie_channel_id)

        const welcomeEmbed = new MessageEmbed()

        welcomeEmbed.setColor('#5cf000')
        welcomeEmbed.setDescription(`Вітаю на сервері <@${client.user.id}>! Ознайомся з правилами серверу та розважайся!`)

        client.roles.add(adminRoleID)

        welcomeChannel.send({embeds: [welcomeEmbed]})
    },
};
