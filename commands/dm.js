exports.run = async (client, message, args, level) => {
  let member =
    message.mentions.members.first() || message.guild.members.get(args[0])
  if (!member) {
    return message.channel.send(
      'Please mention a user or enter a valid user ID'
    )
  }
  args.shift()
  message.delete()
  let msg = args.join(' ')
  await member.send(msg).then(() => {
    message.channel.send('Sent')
  })
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Bot Owner'
}

exports.help = {
  name: 'dm',
  category: 'Fun',
  description: 'Send msg to user!',
  usage: 'dm <@user | user ID>'
}
