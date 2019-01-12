const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
  const settings = (message.settings = client.getSettings(message.guild.id))
  if (settings.nsfwCommands === 'false') {
    return message.channel.send(
      new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setFooter(
          `Issued by ${message.author.username}`,
          message.author.avatarURL
        )
        .setDescription('Sorry, NSFW Commands are not enabled in this server!')
        .setTimestamp()
    )
  }
  if (args.length === 0) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setFooter(
          `Issued by ${message.author.username}`,
          message.author.avatarURL
        )
        .setDescription('Please specify a user!')
        .addField('Usage', 'fuck <@user | user ID>', true)
        .setTimestamp()
    )
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
  // Send message
  return message.channel.send(
    `**${member.user.username}** has been fucked in the ass by **${
      message.author.username
    }**.`
  )
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'fuck',
  category: 'Fun',
  description: 'Fuck someone :P',
  usage: 'fuck <@user | user ID>'
}
