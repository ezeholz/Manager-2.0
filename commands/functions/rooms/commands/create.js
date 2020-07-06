const { MessageEmbed, GuildChannelManager } = require('discord.js')

module.exports = {
  
  trigger: "create",
  enabled: true,
  
  category: "Room",
  description: "Create rooms",
  
  execute(Manager, author, guild) {
    let db = Manager.database;
    
    const values = db.getState()
    
    if(values[author]===undefined) { // No tiene creada una sala
      
      let channels = Manager.client.guilds.resolve('425678929584455683').channels
      
      guild.channels.create('prueba', {'parent':values.voiceCategory,'type':'voice'})
      guild.channels.create('prueba2', {'parent':values.textCategory,'type':'text'})

//       if(args[2]) { // Si tiene para cambiarlo
//         switch(args[1]){
//           case 'look': db.set('channelLook', args[2]).write(); break;
//           case 'voice': db.set('voiceCategory', args[2]).write(); break;
//           case 'text': db.set('textCategory', args[2]).write(); break;
//           default: break;
//         }
//       }

//       const values = db.getState()

//       const embed = new MessageEmbed()
//         .setTitle('Valores actuales')
//         .addFields(
//           {name: 'Channel to lookout', value: values.channelLook},
//           {name: 'Category for voice', value: values.voiceCategory},
//           {name: 'Category for text', value: values.textCategory},
//         )
//         .setColor('#dada3d')

//       msg.channel.send(embed)

      db.get('createdRooms')
        .set('DoTPr0',[123,456,null])
        .write();

      console.log(db.getState())
    }
  }
}