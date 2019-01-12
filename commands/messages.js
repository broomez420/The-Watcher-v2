const Discord = require('discord.js')
const User = require('../models/User')

exports.run = async (client, message, args, level) => {
  if (args.length === 0) {
    try {
      const result = await User.findOne({
        _id: message.guild.id,
        userID: message.author.id
      })
      let embed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setDescription(`Here is your current number of messages sent!`)
        .setFooter(
          `Issued by ${message.author.username}`,
          message.author.avatarURL
        )
        .setTimestamp()
        .addField('Server', client.guilds.get(result._id).name, true)
        .addField('Messages', result.messages, true)
      return message.channel.send(embed)
    } catch (err) {
      let embed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setDescription(`You have not sent any messages!`)
        .setFooter(
          `Issued by ${message.author.username}`,
          message.author.avatarURL
        )
        .setTimestamp()
      return message.channel.send(embed)
    }
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
  // Start display rank here
  if (member.user.bot) {
    let embed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor('#FF0000')
      .setDescription(
        `**${member.user.username}** is a bot and cannot track messages!`
      )
      .setFooter(
        `Issued by ${message.author.username}`,
        message.author.avatarURL
      )
      .setTimestamp()
    return message.channel.send(embed)
  }

  const result = await User.findOne({
    _id: message.guild.id,
    userID: member.id
  })
  let embed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor('#FF0000')
    .setDescription(`Here is your current number of messages sent!`)
    .setFooter(`Issued by ${message.author.username}`, message.author.avatarURL)
    .setTimestamp()
    .addField('Server', client.guilds.get(result._id).name, true)
    .addField('Messages', result.messages, true)
  return message.channel.send(embed)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'messages',
  category: 'Fun',
  description: 'Shows users current number of sent messages',
  usage: 'messages <@user | user ID>'
}
