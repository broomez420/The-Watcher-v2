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
    await message.channel.send(
      `Initiating SWAT procedures on ${member.user.username}, please wait...`
    )
    return message.channel.send(
      `Your local police department has been notified that you have shot your Dad & now have your mother hostage in your home, along with a can of gas with you to burn your house down. Enjoy the shitshow, motherfucker.`
    )
  }
  await message.channel.send(
    `Initiating SWAT procedures on ${member.user.username}, please wait...`
  )
  return message.channel.send(
    `Your local police department has been notified that you have shot your Dad & now have your mother hostage in your home, along with a can of gas with you to burn your house down. Enjoy the shitshow.`
  )
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'swat',
  category: 'Fun',
  description: 'SWAT! OPEN THE DOOR!',
  usage: 'swat <@user | user ID>'
}
