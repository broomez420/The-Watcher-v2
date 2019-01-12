const Discord = require('discord.js')
const https = require('https')

exports.run = async (client, message, args, level) => {
  let online = client.emojis.get('529730448088104960')
  let partialOutage = client.emojis.get('529732052606779422')
  let degradedPerformance = client.emojis.get('529732052350795786')
  let majorOutage = '🔴'

  let componentStatusURL =
    'https://srhpyqt94yxb.statuspage.io/api/v2/components.json'
  https
    .get(componentStatusURL, function (res) {
      var body = ''

      res.on('data', function (chunk) {
        body += chunk
      })

      res.on('end', async function () {
        var response = JSON.parse(body)
        let status = []

        response.components.forEach(comp => {
          let stat = online
          if (comp.status === 'degraded_performance') stat = degradedPerformance
          if (comp.status === 'partial_outage') stat = partialOutage
          if (comp.status === 'major_outage') stat = majorOutage
          if (response.components[8].components.indexOf(comp.id) > -1) return
          status.push(
            `${stat} **${comp.name}** - ${comp.status.charAt(0).toUpperCase() +
              comp.status.slice(1)}`
          )
        })

        let embed = new Discord.RichEmbed()
          .setAuthor(client.user.username, client.user.avatarURL)
          .setColor('#FF0000')
          .setDescription(status)
          .setTimestamp()
          .addField('API Latency', `${Math.round(client.ping)}ms`, true)
          .setFooter(
            `Issued by ${message.author.username}`,
            message.author.avatarURL
          )
        return message.channel.send(embed)
      })
    })
    .on('error', function (e) {
      console.log('Got an error: ', e)
    })
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User'
}

exports.help = {
  name: 'discord',
  category: 'Bot',
  description: 'Get status from Discord',
  usage: 'discord'
}
