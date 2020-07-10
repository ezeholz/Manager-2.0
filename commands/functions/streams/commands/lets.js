const fetch = require('node-fetch')
const { MessageEmbed } = require('discord.js')

module.exports = {
  
  trigger: "lets",
  enabled: true,
  
  category: "Streams",
  description: "Config lets play",
  
  execute(Manager, msg, args) {
    if (+msg.author.id === +Manager.botAuthor) {
      /* 
      Este es un comando admin, por ende voy a detectar cuando soy yo el que lo usa, para que nadie más pueda cambiar eso
      Podría ponerle un generador de códigos, y que imprima el código por acá, tengo que ver todavía.
      */
      const values = db.getState()
      
      let db = Manager.database;
      
      if(args[1]==='play'){
        const text = values.streams[args[2]]
      } else if(args[2]) { // Si tiene para cambiarlo
        switch(args[1]){
          case 'role': db.set('allowRole', msg.mentions.roles.first().id).write(); break;
          case 'channel': db.set('streamChannel', args[2]).write(); break;
          default: break;
        }
      }
      
      
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