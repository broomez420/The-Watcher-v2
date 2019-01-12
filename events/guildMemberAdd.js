const User = require('../models/User')

module.exports = async (client, member) => {
  console.log(`${member.user.username} Joined Server: ${member.guild.name}`)
  if (
    !(await User.findOne({
      _id: member.guild.id,
      userID: member.user.id
    }))
  ) {
    let newUser = new User({
      _id: member.guild.id,
      userID: member.user.id
      // user: member.user
    })
    await newUser.save().then(async member => {
      await console
        .log(
          `Saved user: ${member.user.username} for server ${member.guild.name}`
        )
        .catch(err => {
          console.log(err)
        })
    })
  }
}
