const mongoose = require('mongoose')
const timestamp = require('mongoose-timestamp')
// const Discord = require('discord.js')

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  },
  /* user: {
    type: Discord.User,
    required: true
  }, */
  messages: {
    type: Number,
    default: 0
  },
  coins: {
    type: String,
    default: 0
  },
  xp: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
  money: {
    type: Number,
    default: 0
  },
  isMuted: {
    type: Boolean,
    default: false
  },
  roles: {
    type: Array,
    default: []
  }
})

UserSchema.plugin(timestamp)
/*eslint-disable */
const User = new mongoose.model('User', UserSchema)
/* eslint-enable */
module.exports = User
