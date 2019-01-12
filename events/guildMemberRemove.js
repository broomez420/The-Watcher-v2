module.exports = async (client, member) => {
  console.log('guildMemberRemove', member => {
    let channel = member.guild.channels.find('name', 'leave');
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(memberavatar)
        .addField('Name:', `${member}`)
        .addField('Has Let the Server', ';(')
        .addField('Bye Bye :(', 'We will all miss you!')
        .addField('The server now has', `${member.guild.memberCount}` + " members")
        .setFooter(`**${member.guild.name}`)
        .setTimestamp()
  
        channel.sendEmbed(embed);
  });
  
  // leave member DM message module
  client.on('guildMemberRemove', member => {
    console.log(`${member}` + "has left " + `${member.guild.name}` + " Sending leave message now")
    console.log("Leave Message Sent")
  }); 
}
