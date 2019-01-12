const Server = require('../models/Server')
const User = require('../models/User')

module.exports = async (client, guild) => {
  // Check is server is already in database
  if (
    !(await Server.findOne({
      _id: guild.id
    }))
  ) {
    // Guild does not exist in database so add it
    let newServer = new Server({
      _id: guild.id
      // server: guild
    })
    await newServer.save().then(async guild => {
      await console
        .log(`Added Guild ${guild.name} with id ${guild.id} to the database!`)
        .then(async guild => {
          await guild.members.forEach(async member => {
            if (
              !(await User.findOne({
                _id: guild.id,
                userID: member.user.id
              }))
            ) {
              let newUser = new User({
                _id: guild.id,
                userID: member.user.id
                // user: member
              })
              await newUser.save().catch(err => {
                console.log(err)
              })
            }
          })
        })
        .catch(err => {
          console.log(err)
        })
    })
  }
  // Guild exists in database already
}
