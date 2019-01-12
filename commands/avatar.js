const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
  if (args.length === 0) {
    let embed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription(`Here is your avatar!`)
      .setColor('#FF0000')
      .setImage(message.author.avatarURL)
      .setFooter(
        `Requested by ${message.author.username}`,
        message.author.avatarURL
      )
      .setTimestamp()
    return message.channel.send(embed)
  }
  let member =
    message.mentions.members.first() || message.guild.members.get(args[0])
  if (!member) {
    return message.channel.send(
      'Please mention a user or enter a valid user ID'
    )
  }
  let embed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setDescription(`Here is ${member.user.username}'s avatar!`)
    .setColor('#FF0000')
    .setImage(member.user.avatarURL)
    .setFooter(
      `Requested by ${message.author.username}`,
      message.author.avatarURL
    )
    .setTimestamp()
  return message.channel.send(embed)
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'avatar',
  category: 'Fun',
  description: 'Get a users avatar',
  usage: 'avatar <@user | user id>'
}
