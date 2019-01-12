const Discord = require('discord.js')
const User = require('../models/User')

exports.run = async (client, message, args, level) => {
  let member =
    message.mentions.members.first() || message.guild.members.get(args[0])
  if (!member) {
    return message.channel.send(
      'Please mention a user or enter a valid user ID'
    )
  }
  let muterole = await message.guild.roles.find('name', 'STFU')
  if (!muterole) {
    try {
      muterole = await message.guild.createRole({
        name: 'STFU',
        color: '#000000',
        permissions: []
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          CREATE_INSTANT_INVITE: false,
          CHANGE_NICKNAME: false,
          MANAGE_MESSAGES: false,
          EMBED_LINKS: false,
          ATTACH_FILES: false,
          MENTION_EVERYONE: false,
          USE_EXTERNAL_EMOJIS: false,
          MANAGE_ROLES: false,
          MANAGE_WEBHOOKS: false,
          VIEW_CHANNEL: false
        })
      })
      console.log('Created mute role')
    } catch (e) {
      return message.channel.send(`[stfu.js:31]: ${e.message}`)
    }
  }
  await member.roles.forEach(async role => {
    if (role.id === message.guild.id) return
    await User.findOneAndUpdate(
      { _id: message.guild.id, userID: member.id },
      { $push: { roles: role.id } }
    )
  })

  await member.roles.forEach(async role => {
    if (role.id === message.guild.id) return
    await member.removeRole(role)
  })

  await member
    .addRole(muterole)
    .then(async () => {
      let embed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setFooter(
          `stfu command issued by ${message.author.username}#${
            message.author.discriminator
          } and their ID is ${message.author.id}`
        )
        .setDescription(
          `${member} has been muted, they can no longer see text or voice channels.`
        )
        .setTimestamp()
      return message.channel.send(embed)
    })
    .catch(err => {
      return message.channel.send(`[stfu.js:48]: ${err.message}`)
    })
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Administrator'
}

exports.help = {
  name: 'stfu',
  category: 'Moderation',
  description: 'Mute users',
  usage: 'stfu <@user | user id>'
}
