exports.run = async (client, message, args, level) => {
  let member =
    message.mentions.members.first() || message.guild.members.get(args[0])
  if (!member) {
    return message.channel.send(
      'Please mention a user or enter a valid user ID'
    )
  }

  return message.channel.send(
    `${member.user.username} was just brutally murdered by ${
      message.author.username
    }.`
  )
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['kill'],
  permLevel: 'User'
}

exports.help = {
  name: 'murder',
  category: 'Fun',
  description: 'KILL A USER!',
  usage: 'murder <@user | user ID>'
}
