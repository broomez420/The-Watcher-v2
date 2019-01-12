exports.run = async (client, message, args, level) => {
  const settings = (message.settings = client.getSettings(message.guild.id))
  let member =
    message.mentions.members.first() || message.guild.members.get(args[0])
  if (!member) {
    return message.channel.send(
      'Please mention a user or enter a valid user ID'
    )
  }
  if (settings.nsfwCommands === 'true') {
    return message.channel.send(
      `${
        member.user.username
      }, Man you are fat, What happend to your face? Is your face hurting cause it's killing me. Your family tree must be a cactus becaause everybody on it is a prick. The only way you'll ever get laid is if you crawl up a chicken's ass and wait. You're so fake, Barbie is jealous.`
    )
  }
  return message.channel.send(
    `${
      member.user.username
    }, Man you are fat, What happend to your face? Is your face hurting cause it's killing me. The only way you'll ever get laid is if you crawl up a chicken's ass and wait. You're so fake, Barbie is jealous.`
  )
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['roast'],
  permLevel: 'User'
}

exports.help = {
  name: 'insult',
  category: 'Fun',
  description: 'YOU ARE WORTHLESS!',
  usage: 'insult <@user | user ID>'
}
