const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
  if (args.length === 0) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setFooter(`Issued by ${message.author.username}`)
        .setDescription('verify <@user | user id>')
        .setTimestamp()
    )
  }
  if (typeof message.mentions !== 'undefined') {
    let user =
      message.mentions.members.first() || message.guild.members.get(args[0])

    let embed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor('#FF0000')
      .setFooter(
        `Issued by ${message.author.username}`,
        message.author.avatarURL
      )
      .setTimestamp()
      .setDescription(
        `${user} has been manually verified and given the Verified Role!`
      )
    await message.channel.send(embed)
    await user.roles.forEach(async role => {
      await user.removeRole(role)
    })
    await user.addRole('519295268731224064')
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'Administrator'
}

exports.help = {
  name: 'verify',
  category: 'Moderation',
  description: 'Verify a user',
  usage: 'verify <@user | user id>'
}
