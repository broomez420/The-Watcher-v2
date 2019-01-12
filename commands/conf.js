// This command is to modify/edit guild configuration. Perm Level 3 for admins
// and owners only. Used for changing prefixes and role names and such.

// Note that there's no "checks" in this basic version - no config "types" like
// Role, String, Int, etc... It's basic, to be extended with your deft hands!

// Note the **destructuring** here. instead of `args` we have :
// [action, key, ...value]
// This gives us the equivalent of either:
// const action = args[0]; const key = args[1]; const value = args.slice(2);
// OR the same as:
// const [action, key, ...value] = args;
const Server = require('../models/Server')
const Discord = require('discord.js')

exports.run = async (client, message, [action, key, ...value], level) => {
  // eslint-disable-line no-unused-vars

  // Retrieve current guild settings (merged) and overrides only.
  const settings = await Server.findOne({ _id: message.guild.id }).settings

  // Edit an existing key value
  if (action === 'edit') {
    let embed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor('#FF0000')
      .setTitle(`Please use the dashboard to change settings!`)
      .setFooter(
        `Issued by ${message.author.username}`,
        message.author.avatarURL
      )
      .setTimestamp()
    return message.channel.send(embed)
  } else if (action === 'get') {
    if (!key) return message.channel.send('Please specify a setting to view')
    if (!settings[key]) {
      let embed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setTitle(`The setting ${key} does not exist!`)
        .setFooter(
          `Issued by ${message.author.username}`,
          message.author.avatarURL
        )
        .setTimestamp()
      return message.channel.send(embed)
    }
    let embed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor('#FF0000')
      .setTitle(`Current Value for ${key}`)
      .setDescription(settings[key])
      .setFooter(
        `Issued by ${message.author.username}`,
        message.author.avatarURL
      )
      .setTimestamp()
      .setThumbnail(message.guild.iconURL)
    return message.channel.send(embed)
  } else {
    // Otherwise, the default action is to return the whole configuration;
    let embed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor('#FF0000')
      .setTitle('Current Server Settings')
      .setFooter(
        `Issued by ${message.author.username}`,
        message.author.avatarURL
      )
      .setTimestamp()
      .setThumbnail(message.guild.iconURL)
      .addField(`Server Name`, message.guild.name, true)
      .addField(`Prefix`, settings.prefix, true)
      .addField(`Log Channel`, settings.logChannel, true)
      .addField(`System Notice`, settings.systemNotice, true)
      .addField(`Mute Role`, settings.muteRole, true)
      .addField(`Leveling`, settings.leveling, true)
      .addField(`Coins`, settings.coins, true)
      .addField(`NSFW Commands`, settings.nsfwCommands, true)
      .addField(`Auto Moderator`, settings.autoModerator, true)
    return message.channel.send(embed)
  }
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['setting', 'settings'],
  permLevel: 'Administrator'
}

exports.help = {
  name: 'conf',
  category: 'System',
  description: 'View or change settings for your server.',
  usage: 'conf <view/get> <key>'
}
