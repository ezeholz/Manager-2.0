const { MessageEmbed } = require('discord.js')

module.exports = {
  
  trigger: "rooms",
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
    const embed = new MessageEmbed().setColor('#dada3d')
    
    let db = Manager.database;
    
    const values = db.getState()
    
    if(values.createdRooms[msg.author.id]!==undefined) {
      if(+msg.channel.id === +values.createdRooms[msg.author.id][1]) {
        if(args[1]===undefined){
          embed.setTitle(':no_entry_sign: Seguro que quieres borrar los chats?')
            .setDescription('Para confirmar, por favor usar el comando **.remove confirm**')
          msg.channel.send(embed)
        } else {
          Manager.client.channels.fetch(values.createdRooms[msg.author.id][0]).then(channel => {console.log(channel);channel.delete()})
          db.get('createdRooms').set(msg.author.id,undefined).write()
          msg.channel.delete()
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