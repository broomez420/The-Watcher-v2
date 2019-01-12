const Discord = require('discord.js')
const User = require('../models/User')
const fs = require('fs')

module.exports = async (client, message) => {
  if (message.author.bot) return

  // Log the message
  if (
    !(await User.findOne({
      _id: message.guild.id,
      userID: message.author.id
    }))
  ) {
    let newUser = new User({
      _id: message.guild.id,
      userID: message.author.id
      // user: message.author
    })
    await newUser.save()
  } else {
    let record = await User.findOne({
      _id: message.guild.id,
      userID: message.author.id
    })
    await User.findOneAndUpdate(
      {
        _id: message.guild.id,
        userID: message.author.id
      },
      { messages: record.messages + 1 }
    )
  }
  const settings = (message.settings = client.getSettings(message.guild.id))
  // const settings = await Server.findOne({ guildID: message.guild.id })

  if (settings.autoModerator === 'true') {
    fs.stat('./modules/AutoModeration.js', async (err, stats) => {
      if (err) {
        return console.log(
          `To use the AutoModerator feature you need to AutoModeration Module!`
        )
      }
      const AutoModeration = require('../modules/AutoModeration')
      await AutoModeration.spamCheck(client, message)
    })
  }
  // Add coins
  let coinAmt = Math.floor(Math.random() * 20) + 1
  let baseAmt = Math.floor(Math.random() * 20) + 1

  let record = await User.findOne({
    _id: message.guild.id,
    userID: message.author.id
  })
  if (coinAmt === baseAmt) {
    await User.findOneAndUpdate(
      {
        _id: message.guild.id,
        userID: message.author.id
      },
      { coins: record.coins + coinAmt },
      () => {}
    )
    let coinEmbed = new Discord.RichEmbed()
      .setFooter(message.author.username, message.author.avatarURL)
      .setTimestamp()
      .setDescription(`**${message.author.username}** earned coins!`)
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor('#0000FF')
      .addField('Server', client.guilds.get(record._id).name)
      .addField('Coins Added', coinAmt)
    await message.channel.send(coinEmbed).then(async msg => {
      msg.delete(10000)
    })
  }

  if (settings.leveling === 'true') {
    /* Guild has leveling enabled */
    let xpAdd = Math.floor(Math.random() * 10) + 8

    let record = await User.findOne({
      _id: message.guild.id,
      userID: message.author.id
    })
    let curxp = record.xp
    let curlvl = record.level
    let nxtLvl = record.level * 300
    await User.findOneAndUpdate(
      { _id: message.guild.id, userID: message.author.id },
      { xp: curxp + xpAdd },
      () => {}
    )
    if (nxtLvl <= record.xp) {
      await User.findOneAndUpdate(
        { _id: message.guild.id, userID: message.author.id },
        { level: curlvl + 1 },
        () => {}
      )
      let lvlup = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setDescription('Level Up!')
        .setColor('#FF0000')
        .addField('Was', curlvl, true)
        .addField('Now', curlvl + 1, true)
        .setFooter(message.author.username, message.author.avatarURL)

      await message.channel.send(lvlup).then(async msg => {
        msg.delete(10000)
      })
    }
  }
  if (message.content.startsWith(settings.prefix)) {
    // Here we separate our 'command' name, and our 'arguments' for the command.
    // e.g. if we have the message '+say Is this the real life?' , we'll get the following:
    // command = say
    // args = ['Is', 'this', 'the', 'real', 'life?']
    const args = message.content
      .slice(settings.prefix.length)
      .trim()
      .split(/ +/g)
    const command = args.shift().toLowerCase()

    // If the member on a guild is invisible or not cached, fetch them.
    if (message.guild && !message.member) {
      await message.guild.fetchMember(message.author)
    }

    // Get the user or member's permission level from the elevation
    const level = client.permlevel(message)

    // Check whether the command, or alias, exist in the collections defined
    // in app.js.
    const cmd =
      client.commands.get(command) ||
      client.commands.get(client.aliases.get(command))
    // using this const varName = thing OR otherthign; is a pretty efficient
    // and clean way to grab one of 2 values!
    if (!cmd) return

    // Some commands may not be useable in DMs. This check prevents those commands from running
    // and return a friendly error message.
    if (cmd && !message.guild && cmd.conf.guildOnly) {
      return message.channel.send(
        'This command is unavailable via private message. Please run this command in a guild.'
      )
    }

    if (level < client.levelCache[cmd.conf.permLevel]) {
      if (settings.systemNotice === 'true') {
        return message.channel
          .send(`You do not have permission to use this command.
  Your permission level is ${level} (${
  client.config.permLevels.find(l => l.level === level).name
})
  This command requires level ${client.levelCache[cmd.conf.permLevel]} (${
  cmd.conf.permLevel
})`)
      } else {
        return
      }
    }

    // To simplify message arguments, the author's level is now put on level (not member so it is supported in DMs)
    // The 'level' command module argument will be deprecated in the future.
    message.author.permLevel = level

    message.flags = []
    while (args[0] && args[0][0] === '-') {
      message.flags.push(args.shift().slice(1))
    }
    // If the command exists, **AND** the user has permission, run it.
    console.log(
      `[CMD] ${client.config.permLevels.find(l => l.level === level).name} ${
        message.author.username
      } (${message.author.id}) ran command ${cmd.help.name}`
    )
    cmd.run(client, message, args, level)
  }
}
