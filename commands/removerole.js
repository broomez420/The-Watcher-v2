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
        .setDescription('You must specify a valid role!')
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
        .setDescription(`Please mention a user or enter a valid user ID!`)
        .setTimestamp()
    )
  }
  if (!member.roles.has(gRole.id)) {
    return message.channel.send(
      new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setFooter(`Issued by ${message.author.username}`)
        .setDescription(
          `The user **${member.user.username}** does not have the role **${
            gRole.name
          }**!`
        )
        .setTimestamp()
    )
  }
  await member.removeRole(gRole).then(async () => {
    let embed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor('#FF0000')
      .setFooter(`Issued by ${message.author.username}`)
      .setDescription(
        `Removed role **${gRole.name}** from **${member.user.username}**.`
      )
      .setTimestamp()
    return message.channel.send(embed)
  })
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'Administrator'
}

exports.help = {
  name: 'removerole',
  category: 'Moderation',
  description: 'Remove a role from a user',
  usage: 'removerole <@user> <role name>'
}
