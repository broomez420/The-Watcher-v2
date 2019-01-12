const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
  await message.channel.bulkDelete(args[0]).catch(err => {
    console.log(err)
  })

  let embed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatartURL)
    .setFooter(message.author.username, message.author.avatarURL)
    .setTimestamp()
    .setColor('#FF0000')
    .setDescription(`Deleted ${args[0]} messages.`)
  return message.channel.send(embed)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Administrator'
}

exports.help = {
  name: 'nuke',
  category: 'System',
  description: 'Bulk Delete messages',
  usage: 'nuke <amount>'
}
