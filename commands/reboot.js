const Discord = require('discord.js')
const config = require('../config.js')

exports.run = async (client, message, args, level) => {
  // eslint-disable-line no-unused-vars
  let loadingEmoji = client.emojis.get('416475652922015746')
  let doneEmoji = '✅'
  let embed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor('#FF0000')
    .setDescription(`${loadingEmoji} Rebooting`)
    .setFooter(message.author.username, message.author.avatarURL)
    .setTimestamp()

  let newEmbed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor('#FF0000')
    .setDescription(`${doneEmoji} Done`)
    .setFooter(message.author.username, message.author.avatarURL)
    .setTimestamp()
  client.commands.forEach(async cmd => {
    await client.unloadCommand(cmd)
  })
  let msg = await message.channel.send(embed).then(async msg => {
    client.site.close()
    await client.destroy().then(async () => client.login(config.TOKEN))
    await newEmbed.addField(
      'Time',
      `${msg.createdTimestamp - message.createdTimestamp}ms`
    )
    await msg.edit(newEmbed)
  })
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Bot Admin'
}

exports.help = {
  name: 'reboot',
  category: 'System',
  description:
    'Shuts down the bot. If running under PM2, bot will restart automatically.',
  usage: 'reboot'
}
