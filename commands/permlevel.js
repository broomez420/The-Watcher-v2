const Discord = require('discord.js')
exports.run = async (client, message, args, level) => {
  const friendly = client.config.permLevels.find(l => l.level === level).name
  let embed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor('#FF0000')
    .setFooter(`Issued by ${message.author.username}`, message.author.avatarURL)
    .setTimestamp()
    .addField('Your Permission Level is', `${level} - ${friendly}`, true)
  message.channel.send(embed)
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'permlevel',
  category: 'Miscelaneous',
  description:
    'Tells you your permission level for the current message location.',
  usage: 'level'
}
