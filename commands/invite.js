const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
  let embed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor('#FF0000')
    .setFooter(`Issued by ${message.author.username}`, message.author.avatarURL)
    .setTimestamp()
    .setTitle(
      'Invite Me --> [Click Here!](https://discordapp.com/api/oauth2/authorize?client_id=527655569058955304&permissions=0&scope=bot) <--'
    )
  return message.channel.send(embed)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['add'],
  permLevel: 'User'
}

exports.help = {
  name: 'invite',
  category: 'Bot',
  description: 'Get bot invite link',
  usage: 'invite'
}
