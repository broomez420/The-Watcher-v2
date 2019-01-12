exports.run = async (client, message, args, level) => {
  let member =
    message.mentions.members.first() || message.guild.members.get(args[0])
  if (!member) {
    return message.channel.send(
      'Please mention a user or enter a valid user ID'
    )
  }
  await message.channel.send(
    `Initiating DDoS attack on ${member.user.username}, please wait...`
  )
  return message.channel.send(
    `Malicious UDP packets were sent to their IP address, they should be offline now. :)`
  )
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'ddos',
  category: 'Fun',
  description: 'Send Malicious Packets to a User!',
  usage: 'ddos <@user | user ID>'
}
