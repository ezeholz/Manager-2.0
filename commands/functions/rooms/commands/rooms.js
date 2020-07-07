const { MessageEmbed } = require('discord.js')

module.exports = {
  
  trigger: "room",
  enabled: true,
  
  category: "Room",
  description: "Config to rooms, only for DoTPr0",
  
  execute(Manager, msg, args) {
    if (+msg.author.id === +Manager.botAuthor) {
      /* 
      Este es un comando admin, por ende voy a detectar cuando soy yo el que lo usa, para que nadie más pueda cambiar eso
      Podría ponerle un generador de códigos, y que imprima el código por acá, tengo que ver todavía.
      */
      
      let db = Manager.database;
      
      if(args[2]) { // Si tiene para cambiarlo
        switch(args[1]){
          case 'look': db.set('channelLook', args[2]).write(); break;
          case 'voice': db.set('voiceCategory', args[2]).write(); break;
          case 'text': db.set('textCategory', args[2]).write(); break;
          default: break;
        }
      }
      
      const values = db.getState()
      
      const embed = new MessageEmbed().setColor('#dada3d')
        .setTitle('Valores actuales')
        .addFields(
          {name: 'Channel to lookout', value: values.channelLook},
          {name: 'Category for voice', value: values.voiceCategory},
          {name: 'Category for text', value: values.textCategory},
        )
      
      msg.channel.send(embed)
      
    } else {
      const embed = new MessageEmbed().setColor('#dada3d')
        .setTitle(':no_entry_sign: Andateeeee')
        .setDescription('Papaaaaaaa, no ves que este comando no podés usarlo?')
      msg.channel.send(embed)
    }
  },
  remove(Manager){
    const today = Date.now()
    
    let db = Manager.database;
    
    const values = Object.entries(db.get('createdRooms').value())
    
    values.forEach(room => {
      Manager.client.channels.fetch(room[1][0]).then(e => {
        if(!e.members.array().length) { // Si la sala no tiene personas
          if(room[1][2]===null) {
            db.get('createdRooms')
              .set(room[0],[room[1][0],room[1][1],today])
              .write()
            return
          } else if (Math.floor((today-room[1][2])/60000)>10){
            Manager.client.channels.fetch(room[1][0]).then(channel => {console.log(channel);channel.delete()})
            Manager.client.channels.fetch(room[1][1]).then(channel => {console.log(channel);channel.delete()})
            db.get('createdRooms').set(room[0],undefined).write()
          }
        } else {
          if(room[1][2]!==null) {
            db.get('createdRooms')
              .set(room[0],[room[1][0],room[1][1],null])
              .write()
            return
          }
        }
      })
    })
  }
}