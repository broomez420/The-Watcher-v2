const Discord = require('discord.js')
const User = require('../models/User')

exports.run = async (client, message, args, level) => {
  if (args.length === 0) {
    const result = await User.findOne({
      _id: message.guild.id,
      userID: message.author.id
    })
    let embed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor('#FF0000')
      .setDescription(`Here is your current Rank and XP!`)
      .setFooter(
        `Issued by ${message.author.username}`,
        message.author.avatarURL
      )
      .setTimestamp()
      .addField('Server', client.guilds.get(result._id).name, true)
      .addField('Level', result.level, true)
      .addField('XP', result.xp, true)
      .addField('XP Needed to Rankup', result.level * 300 - result.xp)
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
  // Start display rank here
  if (member.user.bot) {
    let embed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor('#FF0000')
      .setDescription(
        `**${member.user.username}** is a bot and cannot earn XP!`
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
    .setDescription(
      `Here is **${member.user.username}'s** current Rank and XP!`
    )
    .setFooter(`Issued by ${message.author.username}`, message.author.avatarURL)
    .setTimestamp()
    .addField('Server', client.guilds.get(result._id).name, true)
    .addField('Level', result.level, true)
    .addField('XP', result.xp, true)
    .addField('XP Needed to Rankup', result.level * 300 - result.xp)
  return message.channel.send(embed)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'rank',
  category: 'Fun',
  description: 'Shows users current rank',
  usage: 'rank <@user | user ID>'
}
