const Discord = require('discord.js')
const Server = require('../models/Server')

module.exports = {
  errorEmbed: function (client, error, commandName, messageAvatarURL) {
    return new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor('#FF0000')
      .setDescription('Discord API Error!')
      .addField('Error', error, true)
      .setTimestamp()
      .setFooter(commandName, messageAvatarURL)
  },
  serverDocument: async function (client) {
    await client.guilds.forEach(async guild => {
      await Server.findOne({ _id: guild.id }).then(async res => {
        // Check if guild is in database or not
        if (
          !(await Server.findOne({
            _id: guild.id
          }))
        ) {
          // Guild is not in db, so lets add it
          let newServer = new Server({
            _id: guild.id
            // server: guild
          })
          await newServer
            .save()
            .then(async guild => {
              console.log(
                `The server ${
                  client.guilds.get(guild.id).name
                } was missing from the database on system load, so it was added. SRVID: ${
                  guild.id
                }`
              )
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    })
    console.log(`Server Document Check Completed.`)
  }
}
