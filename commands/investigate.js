const Discord = require('discord.js')

exports.run = async (client, message, args, level) => {
  // const settings = (message.settings = client.getSettings(message.guild.id))
  let member =
    message.mentions.members.first() || message.guild.members.get(args[0])
  if (!member) {
    return message.channel.send(
      'Please mention a user or enter a valid user ID'
    )
  }

  let items = [
    'A kilo of cocaine',
    'An AK-47',
    'A pipe bomb',
    'A 6-inch knife',
    'A unicorn horn',
    'A broken bottle',
    'A Shard of Glass',
    "Donald Trump's Foreskin",
    'A map to ISIS Headquarters',
    'A picture of Obama with a red cross on his head',
    'A Fake FBI badge',
    'A Sniper Rifle',
    'A Used napkin',
    'A Rubber glove you can never use again',
    'A Wallet',
    'A Wad of $100 bills',
    'A Wad of $100 bills that are stained with blue die :/',
    'A half empty bottle of Anal Lube'
  ]

  let numberOfItems = Math.floor(Math.random() * items.length) + 1
  // let randomItems = []

  if (numberOfItems === 1) {
    let embed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor('#FF0000')
      .setTitle(`You Search **${member.user.username}** and find nothing!`)
      .setFooter(
        `Searched ${member.user.username} by ${message.author.username}`,
        message.author.avatarURL
      )
      .setTimestamp()
    return message.channel.send(embed)
  }

  /* for (var i = 0; i < numberOfItems; i++) {
    let item = items[Math.floor(Math.random() * items.length)]
    if (randomItems.includes(item)) {
      return
    } else {
      randomItems.push(item)
    }
  }
  if (settings.nsfwCommands === 'true') {
  }
  */

  let embed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setColor('#FF0000')
    .setTitle(`You Search **${member.user.username}** and find:`)
    .setDescription(items[Math.floor(Math.random() * items.length)])
    .setFooter(
      `Searched ${member.user.username} by ${message.author.username}`,
      message.author.avatarURL
    )
    .setTimestamp()
  return message.channel.send(embed)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['search'],
  permLevel: 'User'
}

exports.help = {
  name: 'investigate',
  category: 'Fun',
  description: 'STRIP SEARCH! SQUAT AND COUGH!',
  usage: 'investigate <@user | user ID>'
}
