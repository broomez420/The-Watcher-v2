exports.run = async (client, message, args, level) => {
  let member =
    message.mentions.members.first() || message.guild.members.get(args[0])
  if (!member) {
    return message.channel.send(
      'Please mention a user or enter a valid user ID'
    )
  }
  return message.channel.send(
    `${member.user.username} has been banned from the server!`
  )
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'xban',
  category: 'Fun',
  description: 'BAN A USER!',
  usage: 'xban <@user | user ID>'
}
