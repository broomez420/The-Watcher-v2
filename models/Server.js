const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
// const Discord = require('discord.js')

const ServerSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  /* server: {
    type: Discord.Guild,
    required: true
  }, */
  settings: {
    type: Array,
    required: true,
    prefix: {
      type: String,
      default: 'r!'
    },
    logChannel: {
      type: String,
      default: 'logs'
    },
    systemNotice: {
      type: Boolean,
      default: false
    },
    muteRole: {
      type: String,
      default: 'STFU'
    },
    leveling: {
      type: Boolean,
      default: false
    },
    coins: {
      type: Boolean,
      default: false
    },
    nsfwCommands: {
      type: Boolean,
      default: false
    },
    autoModerator: {
      type: Boolean,
      default: false
    }
  }
})

ServerSchema.plugin(timestamp)
/*eslint-disable */
const Server = new mongoose.model('Server', ServerSchema)
/* eslint-enable */
module.exports = Server
