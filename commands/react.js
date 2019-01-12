const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
  if (args.length < 2) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setFooter(`Issued by ${message.author.username}`)
        .setDescription('Not enough arguments!')
        .setTimestamp()
    )
  }
  let channel = message.channel
  let msg = await channel.fetchMessage(args[0])
  args.shift()

  for (var i = 0; i < args.length; i++) {
    try {
      await msg.react(args[i])
      message.delete()
    } catch (err) {
      return message.channel.send(`[ERROR]: ${err.message}`)
    }
  }
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'react',
  category: 'Fun',
  description: 'React to a message',
  usage: 'react <message id> <message>'
}
