const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = {
  
  trigger: "stream",
  enabled: true,
  
  category: "Streams",
  description: "Config streams",
  
  execute(Manager, msg, args) {
    const embed = new MessageEmbed().setColor('#dada3d')
    
    let db = Manager.database;
    
    const values = db.getState()
    if (+msg.author.id === +Manager.botAuthor) {
      /* 
      Este es un comando admin, por ende voy a detectar cuando soy yo el que lo usa, para que nadie más pueda cambiar eso
      Podría ponerle un generador de códigos, y que imprima el código por acá, tengo que ver todavía.
      */
      
      let db = Manager.database;
      
      if(args[2]) { // Si tiene para cambiarlo
        switch(args[1]){
          case 'add': db.get('streams').set(args[2].toLowerCase(),null).write(); break;
          case 'channel': db.set('streamChat', args[2]).write(); break;
          default: break;
        }
      }
      
      const values = db.getState()
      
      const embed = new MessageEmbed().setColor('#dada3d')
        .setTitle('Valores actuales')
      
      if(Object.keys(values.streams).length){
        embed.addFields(
          {name: 'Streams', value: Object.keys(values.streams)},
          {name: 'Stream Channel Announcer', value: values.streamChat},
        )
      } else {
        embed.addFields(
          {name: 'Streams', value: 'null'},
          {name: 'Stream Channel Announcer', value: values.streamChat},
        )
      }
      msg.channel.send(embed)
      
    } else {
      const embed = new MessageEmbed().setColor('#dada3d')
        .setTitle(':no_entry_sign: Andateeeee')
        .setDescription('Papaaaaaaa, no ves que este comando no podés usarlo?')
      msg.channel.send(embed)
    }
  }
}