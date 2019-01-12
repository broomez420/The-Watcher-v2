const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
  let member =
    message.mentions.members.first() || message.guild.members.get(args[0])
  if (!member) {
    return message.channel.send(
      'Please mention a user or enter a valid user ID'
    )
  }
  if (!member.kickable) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setTimestamp()
        .setFooter(
          `Issued by ${message.author.username}`,
          message.author.avatarURL
        )
        .setDescription(
          'I cannot kick this user! Do they have a higher role? Do I have kick permissions?'
        )
    )
  }

  let reason = args.slice(1).join(' ')
  if (!reason) reason = 'No reason provided'

  await member
    .kick(reason)
    .then(() => {
      return message.channel.send(
        new Discord.RichEmbed()
          .setAuthor(client.user.username, client.user.avatarURL)
          .setColor('#FF0000')
          .setTimestamp()
          .setFooter(`Issued by ${message.author.username}`)
          .setDescription(`Kicked ${member.user.username} for ${reason}`)
      )
    })
    .catch(error => {
      new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setTimestamp()
        .setFooter(`Issued by ${message.author.username}`)
        .setDescription(
          `Failed to kick ${member.user.username} because of ${error.message}`
        )
    })
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Administrator'
}

exports.help = {
  name: 'kick',
  category: 'Moderation',
  description: 'Kick user',
  usage: 'kick <@user | user id>'
}
