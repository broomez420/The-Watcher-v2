const Discord = require('discord.js')
exports.run = async (client, message, args, level) => {
  // eslint-disable-line no-unused-vars
  if (!args || args.length < 1) {
    return message.channel.send('Must provide a command to reload. Derp.')
  }
  let response = await client.unloadCommand(args[0])
  let unloadError = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor('#FF0000')
    .setTimestamp()
    .setTitle('An Error Occured!')
    .setFooter('Oops!', message.author.avatarURL)
    .addField('Error unloading command', response)
  if (response) return message.channel.send(unloadError)

  response = client.loadCommand(args[0])
  let loadError = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor('#FF0000')
    .setTimestamp()
    .setTitle('An Error Occured!')
    .setFooter(
      'Oops!',
      'https://fivera.net/wp-content/uploads/2014/03/error_z0my4n.png'
    )
    .addField('Error loading command', response)
  if (response) return message.channel.send(loadError)

  let success = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor('#FF0000')
    .setTimestamp()
    .setFooter(`Issued by ${message.author.username}`, message.author.avatarURL)
    .addField('Reloaded command', args[0])
  message.channel.send(success)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Bot Admin'
}

exports.help = {
  name: 'reload',
  category: 'System',
  description: "Reloads a command that's been modified.",
  usage: 'reload [command]'
}
