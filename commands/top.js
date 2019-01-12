const Discord = require('discord.js')
const User = require('../models/User')

exports.run = async (client, message, args, level) => {
  if (args.length === 0) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setFooter(`Issued by ${message.author.username}`)
        .setTitle('Not enough arguments!')
        .setDescription('top <rank | coins>')
        .setTimestamp()
    )
  }

  if (args[0].toLowerCase() === 'coins') {
    // Coins
    let topUserCoins = await User.find({ _id: message.guild.id })
      .sort({ coins: -1 })
      .limit(5)
    let coinEmbed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setTitle(`Top 5 Members - Coins`)
      .setColor('#FF0000')
      .setFooter(
        `Issued by ${message.author.username}`,
        message.author.avatarURL
      )
      .setTimestamp()
    await topUserCoins.forEach(async user => {
      await client.fetchUser(user.userID, false).then(async u => {
        await coinEmbed.addField(u.username, `Coins: ${user.coins}`)
      })
    })
    return message.channel.send(coinEmbed)
  }
  if (args[0].toLowerCase() === 'rank') {
    // Rank
    let topUserLevel = await User.find({ _id: message.guild.id })
      .sort({ xp: -1, level: -1 })
      .limit(5)
    let levelEmbed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setTitle(`Top 5 Members - Rank`)
      .setColor('#FF0000')
      .setFooter(
        `Issued by ${message.author.username}`,
        message.author.avatarURL
      )
      .setTimestamp()
    await topUserLevel.forEach(async user => {
      await client.fetchUser(user.userID, false).then(async u => {
        await levelEmbed.addField(
          u.username,
          `Level: ${user.level} | XP: ${user.xp}`
        )
      })
    })
    return message.channel.send(levelEmbed)
  }
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['add'],
  permLevel: 'User'
}

exports.help = {
  name: 'top',
  category: 'Fun',
  description: 'Get top members',
  usage: 'top'
}
