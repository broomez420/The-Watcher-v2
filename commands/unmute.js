const Discord = require('discord.js')
const User = require('../models/User')

exports.run = async (client, message, args, level) => {
  if (args.length < 1) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setFooter(`Issued by ${message.author.username}`)
        .setDescription('unmute [server id] <@user | user id>')
        .setTimestamp()
    )
  }
  if (args.length === 2) {
    let server = await client.guilds.get(args[0])
    let member = await server.members.get(args[1])
    let muterole = await server.roles.find('name', 'STFU')
    if (!member.roles.has(muterole.id)) {
      let embed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setDescription(
          `**${member.user.username}** is not muted on server **${
            server.name
          }**.`
        )
        .setTimestamp()
        .setFooter(
          `Issued by ${message.author.username}`,
          message.author.avatarURL
        )
      return message.channel.send(embed)
    }
    let roles = User.roles
    for (var i = 0; i < roles.length; i++) {
      let role = await client.guilds.get(User._id).roles.get(roles[i])
      await member.addRole(role)
    }
    await member
      .removeRole(muterole)
      .catch(err => message.channel.send(`[unmute.js:43]: ${err.message}`))
    let embed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor('#FF0000')
      .setFooter(
        `Issued by ${message.author.username}`,
        message.author.avatarURL
      )
      .setDescription(
        `**${member.user.username}** has been unmuted on server **${
          server.name
        }**.`
      )
      .setTimestamp()
    await User.findOneAndUpdate({
      _id: server.id,
      userID: member.id
    }, { isMuted: false, roles: [] })
    return message.channel.send(embed)
  }
  let member = message.mentions.members.first()
  if (!member) {
    try {
      member = await message.guild.members.get(args[0])
    } catch (err) {
      return message.channel.send(
        'Please mention a user or enter a valid user ID'
      )
    }
  }
  let muterole = await message.guild.roles.find('name', 'STFU')
  if (!member.roles.has(muterole.id)) {
    let embed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor('#FF0000')
      .setDescription(`${member} is not muted.`)
      .setTimestamp()
      .setFooter(
        `Issued by ${message.author.username}`,
        message.author.avatarURL
      )
    return message.channel.send(embed)
  }

  let mute = await User.findOne({ _id: args[0], userID: member.id })
  let roles = mute.roles
  /* eslint-disable */
  for (var i = 0; i < roles.length; i++) {
    let role = await client.guilds.get(mute._id).roles.get(roles[i])
    await member.addRole(role)
  }
  /* eslint-enable */
  await member
    .removeRole(muterole)
    .then(async () => {
      let embed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setFooter(
          `Issued by ${message.author.username}`,
          message.author.avatarURL
        )
        .setDescription(`${member} has been unmuted.`)
        .setTimestamp()
      return message.channel.send(embed)
    })
    .catch(err => message.channel.send(`[unmute.js:48]: ${err.message}`))
  await User.findOneAndUpdate({ _id: message.guild.id, userID: member.id }, { isMuted: false, roles: [] })
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Administrator'
}

exports.help = {
  name: 'unmute',
  category: 'Moderation',
  description: 'Un-Mute users',
  usage: 'unmute <@user | user id>'
}
