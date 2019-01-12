const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
  if (args.length < 2) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setFooter(`Issued by ${message.author.username}`)
        .setDescription('Not enough arguments!')
        .setTimestamp()
    )
  }
  let role = args
    .join(' ')
    .slice(22)
    .trim()
  if (!role) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setFooter(`Issued by ${message.author.username}`)
        .setDescription('You must specify a role!')
        .setTimestamp()
    )
  }
  let gRole = message.guild.roles.find(`name`, role)
  if (!gRole) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setFooter(`Issued by ${message.author.username}`)
        .setDescription(`The role **${role}** does not exist!`)
        .setTimestamp()
    )
  }

  let member =
    message.mentions.members.first() || message.guild.members.get(args[0])
  if (!member) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setFooter(`Issued by ${message.author.username}`)
        .setDescription(`Please mention a user!`)
        .setTimestamp()
    )
  }
  if (member.roles.has(gRole.id)) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setFooter(`Issued by ${message.author.username}`)
        .setDescription(
          `The user **${member.user.username}** already has the role **${
            gRole.name
          }**!`
        )
        .setTimestamp()
    )
  }
  try {
    await member.addRole(gRole).then(async () => {
      let embed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setFooter(`Issued by ${message.author.username}`)
        .setDescription(
          `Added role **${gRole.name}** to **${member.user.username}**.`
        )
        .setTimestamp()
      return message.channel.send(embed)
    })
  } catch (err) {
    return message.channel.send(`[addrole.js:78]: ${err.message}`)
  }
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Administrator'
}

exports.help = {
  name: 'addrole',
  category: 'Moderation',
  description: 'Add a role to a user',
  usage: 'addrole <@user> <role name>'
}
