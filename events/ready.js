const mongoose = require('mongoose')
const utils = require('../modules/utils')

module.exports = async client => {
  //start of console messages
client.on('ready', () => {
  setInterval(async ()=>{
      
      let textList = ['How to Manage CFCC','lurking','Learning']
      var text = textList[Math.floor(Math.random() * textList.length)];
      client.user.setActivity(text , { type: 'WATCHING' })
  },60000) // milliseconds
});
  
client.on('ready', () => {
// List servers the bot is connected to
  console.log("Servers:")
    client.guilds.forEach((guild) => {
    console.log(" - " + guild.name)
  })

})  
//end of console messages
  await client.wait(1000)

  client.appInfo = await client.fetchApplication()
  setInterval(async () => {
    client.appInfo = await client.fetchApplication()
  }, 60000)
  if (!client.settings.has('default')) {
    if (!client.config.defaultSettings) {
      throw new Error(
        'defaultSettings not preset in config.js or settings database. Bot cannot load.'
      )
    }
    await client.settings.set('default', client.config.defaultSettings)
  }
  require('../modules/dashboard')(client)

  await client.user.setPresence({
    game: {
      name: `${client.settings.get('default').prefix}help | ${
        client.guilds.size
      } Servers`,
      type: 0
    }
  })
  await console.log(
    `${client.user.tag}, ready to serve ${client.users.size} users in ${
      client.guilds.size
    } servers. Dashboard started on port ${client.config.dashboard.port}`
  )
  // Connect to mongoose
  await mongoose.connect(
    client.config.MONGODB_URI,
    { useNewUrlParser: true }
  )

  // Get mongoose connection
  const db = await mongoose.connection

  /* Mongoose Events */
  db.on('error', err => console.log(err))

  db.once('open', async () => {
    await console.log('Mongoose Ready!')
  })
  /* End Mongoose Events */

  // Checks to make sure the servers the bot is already in are in the db
  utils.serverDocument(client)

  /* TCOP ONLY */
  const guild = client.guilds.get('518898839835508736')
  const channel = guild.channels.get('519297263797927936')

  setInterval(async () => {
    let fetched = await channel.fetchMessages({ limit: 100 })
    await channel.bulkDelete(fetched).then(async mssg => {
      await channel.send('Messages Cleared').then(await mssg.delete)
    })
  }, 86400000)
}
