const { MessageEmbed } = require('discord.js')

module.exports = {
  
  trigger: "invite",
  enabled: true,
  
  category: "Room",
  description: "Invite to your room",
  
  execute(Manager, msg, args) {
    
    const embed = new MessageEmbed().setColor('#dada3d')
    
    let db = Manager.database;
    
    const values = db.getState()
    
    if(values.createdRooms[msg.author.id]!==undefined) {
      if(+msg.channel.id === +values.createdRooms[msg.author.id][1]) {
        let users = msg.mentions.users
        console.log(users)
        if(users){
          users.forEach(function(user){
            msg.channel.createOverwrite(user,{ VIEW_CHANNEL: true })
            Manager.client.channels.fetch(values.createdRooms[msg.author.id][0]).then(channel => {channel.createOverwrite(user,{ CONNECT: true })})
            embed.setTitle('<a:rainbowfrog:505995805321330688> ' + user.username + ' se nos ha unido a la party')
            msg.channel.send(embed)
          })
        } else {
          embed.setTitle('<a:wtf_plain:505995803035172874> A quienes meto?')
            .setDescription('Tranquiiiilo, estás en otra sala. Probá de nuevo en la tuya.')
          msg.channel.send(embed)
        }
      } else {
        embed.setTitle(':no_entry_sign: Esta no es tu sala crack')
          .setDescription('Tranquiiiilo, estás en otra sala. Probá de nuevo en la tuya.')
        msg.channel.send(embed)
      }
    } else {
      embed.setTitle(':no_entry_sign: Sacá la mano de ahí')
        .setDescription('Brou, pero ni sala tenés creada. Sacá la mano de ahí carajo.')
      msg.channel.send(embed)
    }
  }
}