const { MessageEmbed } = require('discord.js')

module.exports = {
  
  trigger: "kick",
  enabled: true,
  
  category: "Room",
  description: "Kick from your room",
  
  execute(Manager, msg, args) {
    
    const embed = new MessageEmbed().setColor('#dada3d')
    
    let db = Manager.database;
    
    const values = db.getState()
    
    if(values.createdRooms[msg.author.id]!==undefined) {
      if(+msg.channel.id === +values.createdRooms[msg.author.id][1]) {
        let users = msg.mentions.users
        if(users.array().length){
          users.forEach(function(user){
            msg.channel.permissionOverwrites.get(user.id).delete()
            Manager.client.channels.fetch(values.createdRooms[msg.author.id][0]).then(channel => {
              channel.permissionOverwrites.get(user.id).delete();
              const m = channel.members.find(u=>+u.id === +user.id)
              if(m) m.edit({channel:null})
            })
            embed.setTitle(':cry: Una pena que '+user.username+' se tenga que ir')
              .setDescription('No realmente, soy un bot, no puedo apegarme a las personas.')
            msg.channel.send(embed)
          })
        } else {
          Manager.client.channels.fetch(values.createdRooms[msg.author.id][0]).then(channel => {channel.delete()})
          msg.channel.delete()
          values.createdRooms[msg.author.id] = undefined
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