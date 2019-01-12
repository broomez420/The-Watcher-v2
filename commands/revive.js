exports.run = async (client, message, args, level) => {
  let member =
    message.mentions.members.first() || message.guild.members.get(args[0])
  if (!member) {
    return message.channel.send(
      'Please mention a user or enter a valid user ID'
    )
  }

  return message.channel.send(
    `${member.user.username} was revived by ${message.author.username}.`
  )
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['heal'],
  permLevel: 'User'
}

exports.help = {
  name: 'revive',
  category: 'Fun',
  description: 'ZOMBIES!',
  usage: 'revive <@user | user ID>'
}
