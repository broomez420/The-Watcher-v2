const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.js')
const { promisify } = require('util')
const readdir = promisify(require('fs').readdir)
const Enmap = require('enmap')
require('./modules/functions.js')(client)

if (config.useNewRelic) {
  client.log('log', '-> Using New Relic <-')
  require('newrelic')
}
client.commands = new Enmap()
client.aliases = new Enmap()
client.config = require('./config.js')
client.settings = new Enmap({ name: 'settings' })

const init = async () => {
  const cmdFiles = await readdir('./commands/')
  client.log('log', `Loading a total of ${cmdFiles.length} commands.`)
  cmdFiles.forEach(f => {
    if (f.startsWith('_template')) return
    if (!f.endsWith('.js')) return
    const response = client.loadCommand(f)
    if (response) client.log('log', response)
  })
  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir('./events/')
  client.log('log', `Loading a total of ${evtFiles.length} events.`)
  evtFiles.forEach(file => {
    const eventName = file.split('.')[0]
    client.log('log', `Loading Event: ${eventName}`)
    const event = require(`./events/${file}`)
    // Bind the client to any event, before the existing arguments
    // provided by the discord.js event.
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client))
  })
  // Generate a cache of client permissions for pretty perm names in commands.
  client.levelCache = {}
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i]
    client.levelCache[thisLevel.name] = thisLevel.level
  }
  client.login(process.env.BOT_TOKEN)
}
init()
