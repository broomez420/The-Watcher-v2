const Discord = require('discord.js')
const moment = require('moment')

exports.run = async (client, message, args, level) => {
  const now = new Date()
  const next = new Date(now)
  next.setFullYear(now.getFullYear() + 1)
  next.setHours(0, 0, 0, 0)
  next.setMonth(0, 1)
  const duration = next - now
  const seconds = Math.floor((duration / 1000) % 60)
  const minutes = Math.floor((duration / 1000 / 60) % 60)
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
  const days = Math.floor(duration / (1000 * 60 * 60 * 24))

  let embed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor('#FF0000')
    .setTimestamp()
    .setDescription(
      `There are **${days} days**, **${hours} hours**, **${minutes} minutes** and **${seconds} seconds** until **${next.getFullYear()}**! 🎆`
    )
    .setFooter(`Or in short, ${moment.duration(next - now).humanize()}.`)

  return message.channel.send(embed)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'year',
  category: 'Fun',
  description: 'How long until the next year!',
  usage: 'year'
}
