/*
The HELP command is used to display every command's name and description
to the user, so that he may see what commands are available. The help
command is also filtered by level, so if a user does not have access to
a command, it is not shown to them. If a command name is given with the
help command, its extended help is shown.
*/
const Discord = require('discord.js')

let obj = {}
exports.run = async (client, message, args, level) => {
  // If no specific command is called, show all filtered commands.
  if (!args[0]) {
    await message.reply('Check your DMs.')
    // Filter all commands by which are available for the user's level, using the <Collection>.filter() method.
    const myCommands = message.guild
      ? client.commands.filter(
        cmd => client.levelCache[cmd.conf.permLevel] <= level
      )
      : client.commands.filter(
        cmd =>
          client.levelCache[cmd.conf.permLevel] <= level &&
            cmd.conf.guildOnly !== true
      )

    // Here we have to get the command names only, and we use that array to get the longest name.
    // This make the help commands 'aligned' in the output.
    const commandNames = myCommands.keyArray()
    const categories = ['Miscelaneous', 'Moderation', 'System', 'Bot', 'Fun']
    categories.forEach(cat => {
      obj[cat] = []
    })
    commandNames.reduce((long, str) => Math.max(long, str.length), 0)
    const sorted = myCommands
      .array()
      .sort((p, c) =>
        p.help.category > c.help.category
          ? 1
          : p.help.name > c.help.name && p.help.category === c.help.category
            ? 1
            : -1
      )
    sorted.forEach(c => {
      const cat = c.help.category.toProperCase()
      obj[cat].push(c.help.name + ' - ' + c.help.description)
    })
    for (var cats in obj) {
      let embed = new Discord.RichEmbed()
        .setAuthor(
          client.user.username,
          client.user.avatarURL,
          `${client.config.dashboard.fullURL}`
        )
        .setColor('#FF0000')
        .setTitle(cats)
        .setDescription(obj[cats])
        .setTimestamp()
        .setFooter(message.author.username, message.author.avatarURL)
      await message.author.send(embed)
    }
    let dashboardLinkEmbed = new Discord.RichEmbed()
      .setAuthor(
        client.user.username,
        client.user.avatarURL,
        `${client.config.dashboard.fullURL}`
      )
      .setColor('#FF0000')
      .setTitle('Bot Dashboard URL')
      .setDescription(`Link to Web Dashboard to manage and configure the bot.`)
      .addField('Dashboard Link', client.config.dashboard.fullURL, true)
      .setTimestamp()
      .setFooter(message.author.username, message.author.avatarURL)
    await message.author.send(dashboardLinkEmbed)
  } else {
    // Show individual command's help.
    let command = args[0]
    if (client.commands.has(command)) {
      command = client.commands.get(command)
      if (level < client.levelCache[command.conf.permLevel]) return
      message.channel.send(
        `= ${command.help.name} = \n${command.help.description}\nusage:: ${
          command.help.usage
        }\naliases:: ${command.conf.aliases.join(', ')}\n= ${
          command.help.name
        } =`,
        { code: 'asciidoc' }
      )
    }
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp'],
  permLevel: 'User'
}

exports.help = {
  name: 'help',
  category: 'System',
  description: 'Displays all the available commands for your permission level.',
  usage: 'help [command]'
}
