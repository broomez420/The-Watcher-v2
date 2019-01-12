const Discord = require('discord.js')
exports.run = async (client, message, args, level) => {
  // eslint-disable-line no-unused-vars
  const msg = await message.channel.send('Thinking....................')
  let embed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor('#FF0000')
    .setTitle('Pong!')
    .setFooter(message.author.username, message.author.avatarURL)
    .setTimestamp()
    .addField(
      'Bot Latency',
      `${msg.createdTimestamp - message.createdTimestamp}ms`,
      true
    )
    .addField('API Latency', `${Math.round(client.ping)}ms`, true)
  msg.edit(embed)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'ping',
  category: 'Miscelaneous',
  description: "It like... Pings. Then Pongs. And it's not Ping Pong.",
  usage: 'ping'
}
