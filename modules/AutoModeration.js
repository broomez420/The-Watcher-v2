// This module is for Artificial Intelligent Auto Moderation. Examples are detecting spam and handling it, detecting links to Discord Server, detecting cursing, etc

const Discord = require('discord.js')
const Mute = require('../models/Mute')

let authors = []
let warned = []
let muted = []
let banned = []
let messagelog = []

// Set options
const warnBuffer = 3
const maxBuffer = 5
const interval = 1000
const banMessage = 'Has Been Banned for Spamming!'
const maxDuplicatesWarning = 5
const maxDuplicatesBan = 10
const deleteMessagesAfterBanForPastDays = 7
const exemptRoles = []
const exemptUsers = []

module.exports = {
  spamCheck: function (client, msg) {
    // Return immediately if user is exempt
    if (
      msg.member &&
      msg.member.roles.some(r => exemptRoles.includes(r.name))
    ) {
      return
    }
    if (exemptUsers.includes(msg.author.tag)) return

    if (msg.author.id !== client.user.id && msg.channel.guild) {
      var now = Math.floor(Date.now())
      authors.push({
        time: now,
        author: msg.author.id
      })
      messagelog.push({
        message: msg.content,
        author: msg.author.id
      })
    }
    // Check how many times the same message has been sent.
    var msgMatch = 0
    for (var i = 0; i < messagelog.length; i++) {
      if (
        messagelog[i].message === msg.content &&
        messagelog[i].author === msg.author.id &&
        msg.author.id !== client.user.id
      ) {
        msgMatch++
      }
    }
    // Check matched count
    if (msgMatch === maxDuplicatesWarning && !warned.includes(msg.author.id)) {
      this.warn(client, msg, msg.author.id)
    }
    if (msgMatch === maxDuplicatesBan && !banned.includes(msg.author.id)) {
      this.mute(client, msg, msg.author.id)
    }

    var matched = 0

    /* eslint-disable */
    for (var i = 0; i < authors.length; i++) {
      if (authors[i].time > now - interval) {
        matched++
        if (matched === warnBuffer && !warned.includes(msg.author.id)) {
          this.warn(client, msg, msg.author.id)
        } else if (matched === maxBuffer) {
          if (!banned.includes(msg.author.id)) {
            this.mute(client, msg, msg.author.id)
          }
        }
      } else if (authors[i].time < now - interval) {
        authors.splice(i)
        warned.splice(warned.indexOf(authors[i]))
        banned.splice(warned.indexOf(authors[i]))
      }
      if (messagelog.length >= 200) {
        messagelog.shift()
      }
    }
    /* eslint-enable */
  },
  warn: function (client, msg, userid) {
    warned.push(msg.author.id)
    let muteEmbed = new Discord.RichEmbed()
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor('#FF0000')
      .setTitle(`Warning | ${msg.author.username}#${msg.author.discriminator}`)
      .addField('User', msg.author.username, true)
      .addField('User ID', msg.author.id, true)
      .setDescription('Stop Spamming')
      .setFooter(msg.author.username, msg.author.avatarURL)
      .setTimestamp()
    return msg.channel.send(muteEmbed)
  },
  mute: async function mute (client, msg, userid) {
    /* if (await Mute.findOne({ guildID: msg.guild.id, person: msg.author.id })) {
      return msg.channel.send(`${msg.author.username}, Already Muted.`)
    } */
    let muterole = await msg.guild.roles.find('name', 'STFU')
    if (!muterole) {
      try {
        muterole = await msg.guild.createRole({
          name: 'STFU',
          color: '#000000',
          permissions: []
        })
        msg.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            CREATE_INSTANT_INVITE: false,
            CHANGE_NICKNAME: false,
            MANAGE_MESSAGES: false,
            EMBED_LINKS: false,
            ATTACH_FILES: false,
            MENTION_EVERYONE: false,
            USE_EXTERNAL_EMOJIS: false,
            MANAGE_ROLES: false,
            MANAGE_WEBHOOKS: false,
            VIEW_CHANNEL: false
          })
        })
        console.log('Created mute role')
      } catch (e) {
        return msg.channel.send(`[AutoModeration Module:120]: ${e.message}`)
      }
    }

    for (var i = 0; i < messagelog.length; i++) {
      if (messagelog[i].author === msg.author.id) {
        messagelog.splice(i)
      }
    }

    muted.push(msg.author.id)

    var user = msg.channel.guild.members.find(
      member => member.user.id === msg.author.id
    )
    if (user) {
      // Save the users current roles
      let newMute = new Mute({
        guildID: msg.guild.id,
        person: msg.author.id,
        roles: []
      })
      await newMute.save()
      let member = msg.guild.members.get(msg.author.id)
      await member.roles.forEach(async role => {
        if (role.id === msg.guild.id) return
        await Mute.findOneAndUpdate(
          { guildID: msg.guild.id, person: msg.author.id },
          { $push: { roles: role.id } }
        )
      })
      await member.roles.forEach(async role => {
        if (role.id === msg.guild.id) return
        member.removeRole(role.id)
      })
      await member.addRole(muterole)
      let muteEmbed = new Discord.RichEmbed()
        .setAuthor(client.user.username, client.user.avatarURL)
        .setColor('#FF0000')
        .setTitle(`Mute | ${msg.author.username}#${msg.author.discriminator}`)
        .addField('User', msg.author.username, true)
        .addField('User ID', msg.author.id, true)
        .addField('Reason', 'Spam')
        .setFooter(msg.author.username, msg.author.avatarURL)
        .setTimestamp()
      return msg.channel.send(muteEmbed)
      /*  user
        .ban(deleteMessagesAfterBanForPastDays)
        .then(member => {
          msg.channel.send(`${msg.author}, ${banMessage}`)
          return true
        })
        .catch(() => {
          msg.channel.send(
            `Insufficient permission to ban ${
              msg.author.username
            } for spamming.`
          )
          return false
        }) */
    }
  },
  ban: function ban (msg, userid) {
    for (var i = 0; i < messagelog.length; i++) {
      if (messagelog[i].author === msg.author.id) {
        messagelog.splice(i)
      }
    }

    banned.push(msg.author.id)

    var user = msg.channel.guild.members.find(
      member => member.user.id === msg.author.id
    )
    if (user) {
      user
        .ban(deleteMessagesAfterBanForPastDays)
        .then(member => {
          msg.channel.send(`${msg.author}, ${banMessage}`)
          return true
        })
        .catch(() => {
          msg.channel.send(
            `Insufficient permission to ban ${
              msg.author.username
            } for spamming.`
          )
          return false
        })
    }
  }
}
