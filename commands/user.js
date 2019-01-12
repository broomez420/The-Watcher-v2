const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
  if (args.length === 0) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setFooter(
          `Issued by ${message.author.username}`,
          message.author.avatarURL
        )
        .setDescription('Please specify a user!')
        .addField('Usage', 'user <@user | user ID>', true)
        .setTimestamp()
    )
  }
  let member = message.mentions.members.first()
  if (!member) {
    try {
      member = await message.guild.members.get(args[0])
    } catch (err) {
      return message.channel.send(
        'Please mention a user or enter a valid user ID'
      )
    }
  }
  let roles = []
  await member.roles.forEach(role => {
    if (role.id === message.guild.id) return
    roles.push(`<@&${role.id}>`)
  })
  let embed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor('#FF0000')
    .setDescription(`Here is ${member.user.username}'s information!`)
    .setFooter(
      `Requested by ${message.author.username}`,
      message.author.avatarURL
    )
    .setTimestamp()
    .addField(`Username`, member.user.username, true)
    .addField(`Nickname`, member.nickname, true)
    .setThumbnail(member.user.displayAvatarURL)
    .addField(`Is Bot`, member.user.bot, true)
    .addField(`Status`, member.user.presence.status, true)
    .addField(`Game`, member.user.presence.game, true)
    .addField(`Account Created`, new Date(member.user.createdTimestamp), true)
    .addField(`Joined`, new Date(member.joinedTimestamp), true)
    .addField(`Roles`, roles.toString(), true)
  return message.channel.send(embed)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'user',
  category: 'Fun',
  description: 'Show users information',
  usage: 'user <@user | user ID>'
}
