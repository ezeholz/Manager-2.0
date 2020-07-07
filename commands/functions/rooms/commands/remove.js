const { MessageEmbed, GuildChannelManager } = require('discord.js')

module.exports = {
  
  trigger: "remove",
  enabled: true,
  
  category: "Room",
  description: "Remove rooms",
  
  execute(Manager, msg, args) {
    let db = Manager.database;
    
    const values = db.getState()
    
    if(values.createdRooms[msg.author.id]!==undefined) {
      if(+msg.channel.id === values.createdRooms[msg.author.id][1]) {
        if(args[1]===undefined){
          
        } else {
          
        }
      } else {
        // Está en otra sala
      }
    } else {
      // No tienen salas creadas
    }
    
//       const embed = new MessageEmbed().setColor('#dada3d')
//         .setTitle('Valores actuales')
//         .addFields(
//           {name: 'Channel to lookout', value: values.channelLook},
//           {name: 'Category for voice', value: values.voiceCategory},
//           {name: 'Category for text', value: values.textCategory},
//         )
      
    // msg.channel.send(embed)
  },
  
//   async voice(Manager, author, guild) {
//     let db = Manager.database;
    
//     const values = db.getState()
    
//     console.log(values.createdRooms[author.id])
    
//     if(values.createdRooms[author.id]===undefined) { // No tiene creada una sala
      
//       const name = guild.member(author.id).displayName
      
//       let created = [null,null,null]
      
//       const embed = new MessageEmbed()
//         .setTitle('Valores actuales')
//         .addFields(
//           {name: 'Channel to lookout', value: values.channelLook},
//           {name: 'Category for voice', value: values.voiceCategory},
//           {name: 'Category for text', value: values.textCategory},
//         )
//         .setColor('#dada3d')
      
//       await guild.channels.create('Salón de ' + name, {'parent':values.voiceCategory,'type':'voice'})
//         .then(function(channel){
//           created[0] = channel.id
//           author.setChannel(channel)
//         })
//       await guild.channels.create('Notas de ' + name, {'parent':values.textCategory,'type':'text'})
//         .then(function(channel){
//           created[1] = channel.id
//           channel.send(embed)
//         })

//       db.get('createdRooms')
//         .set(author.id,created)
//         .write();
      
//     } else {
//       author.setChannel(values.createdRooms[author.id][0])
//     }
//   }
}