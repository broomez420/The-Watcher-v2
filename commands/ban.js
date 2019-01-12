const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
  let member =
    message.mentions.members.first() || message.guild.members.get(args[0])
  if (!member) {
    return message.channel.send(
      'Please mention a user or enter a valid user ID'
    )
  }
  if (!member.bannable) {
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
          'I cannot ban this user! Do they have a higher role? Do I have ban permissions?'
        )
    )
  }

  let reason = args.slice(1).join(' ')
  if (!reason) reason = 'No reason provided'

  await member
    .ban(reason)
    .then(async () => {
      return message.channel.send(
        new Discord.RichEmbed()
          .setAuthor(client.user.username, client.user.avatarURL)
          .setColor('#FF0000')
          .setTimestamp()
          .setFooter(`Issued by ${message.author.username}`)
          .setDescription(`Banned ${member.user.username} for ${reason}`)
      )
    })
    .catch(error => {
      return message.channel.send(
        new Discord.RichEmbed()
          .setAuthor(client.user.username, client.user.avatarURL)
          .setColor('#FF0000')
          .setTimestamp()
          .setFooter(`Issued by ${message.author.username}`)
          .setDescription(
            `Failed to ban ${member.user.username} because of ${error.message}`
          )
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
  name: 'ban',
  category: 'Moderation',
  description: 'Ban user',
  usage: 'ban <@user | user id>'
}
