const Discord = require('discord.js')
const User = require('../models/User')

exports.run = async (client, message, args, level) => {
  let rate = Math.floor(Math.random() * 10) + 1
  if (args.length === 0) {
    var amountToTrade
    return message.channel.send(`Specify amount`)
  }
  if (args.length === 1) {
    let coinDoc = await User.findOne({
      _id: message.guild.id,
      userID: message.author.id
    })
    if (args[0] === 'all') {
      amountToTrade = coinDoc.coins
    } else {
      amountToTrade = args[0]
    }
    console.log(amountToTrade)
    if (coinDoc.coins >= amountToTrade) {
      let money = amountToTrade * rate
      if (
        !(await User.findOne({
          _id: message.guild.id,
          userID: message.author.id
        }))
      ) {
        let newMoney = new User({
          _id: message.guild.id,
          userID: message.author.id,
          money: money
        })
        await newMoney.save()
        await User.findOneAndUpdate(
          { _id: message.guild.id, userID: message.author.id },
          { coins: coinDoc.coins - amountToTrade }
        )
        let embed = new Discord.RichEmbed()
          .setAuthor(client.user.username, client.user.avatarURL)
          .setColor('#FF0000')
          .setDescription(
            `I have converted your coins! ${amountToTrade}c/$${amountToTrade *
              rate}`
          )
          .setTimestamp()
          .setFooter(
            `Issued by ${message.author.username}`,
            message.author.avatarURL
          )
          .setThumbnail('')
          .addField('Rate', `$${rate}/coin`, true)
          .addField('New Coin Balance', coinDoc.coins - amountToTrade)
          .addField(`New Money Balance`, money)
        return message.channel.send(embed)
      }
      let record = await User.findOne({
        _id: message.guild.id,
        userID: message.author.id
      })
      await User.findOneAndUpdate(
        { _id: message.guild.id, userID: message.author.id },
        { money: record.money + money }
      )
      await User.findOneAndUpdate(
        { _id: message.guild.id, userID: message.author.id },
        { coins: coinDoc.coins - amountToTrade }
      )
      let embed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setDescription(
          `I have converted your coins! ${amountToTrade}c/$${amountToTrade *
            rate}`
        )
        .setTimestamp()
        .setFooter(
          `Issued by ${message.author.username}`,
          message.author.avatarURL
        )
        .setThumbnail('')
        .addField('Rate', `$${rate}/coin`, true)
        .addField('New Coin Balance', coinDoc.coins - amountToTrade)
        .addField(`New Money Balance`, record.money + money)
      return message.channel.send(embed)
    } else {
      return message.channel.send(
        `Not enough coins. You have ${coinDoc.coins} and need ${amountToTrade -
          coinDoc.coins}`
      )
    }
  }
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'trade',
  category: 'Fun',
  description: 'Trade coins for money',
  usage: 'trade <amount | all>'
}
