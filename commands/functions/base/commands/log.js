const { MessageEmbed } = require('discord.js')

module.exports = {
  
  trigger: "log",
  enabled: true,
  
  category: "Base",
  description: "Send log to a chat",
  
  execute(Manager, msg, args) {
    if (+msg.author.id === +Manager.botAuthor) {
      /* 
      Este es un comando admin, por ende voy a detectar cuando soy yo el que lo usa, para que nadie más pueda cambiar eso
      Podría ponerle un generador de códigos, y que imprima el código por acá, tengo que ver todavía.
      */
      
      let db = Manager.database;
      
      if(args[1]) { db.set('log',args[1]).write(); }
      
      const values = db.getState()
      
      const embed = new MessageEmbed().setColor('#dada3d')
        .setTitle('Valores actuales')
        .addFields(
          {name: 'Channel Log Selected', value: values.log},
        )
      
      msg.channel.send(embed)
      
    } else {
      const embed = new MessageEmbed().setColor('#dada3d')
        .setTitle(':no_entry_sign: Andateeeee')
        .setDescription('Papaaaaaaa, no ves que este comando no podés usarlo?')
      msg.channel.send(embed)
    }
  },
  log(Manager,msg) {
    let db = Manager.database;
    
    const values = db.getState()
    
    if(values.log!==null){
      const embed = new MessageEmbed().setColor('#dada3d')
        .setDescription(msg)
      Manager.client.channels.fetch(values.log).then(channel => {channel.send(embed)})
    } else {
      console.log('No hay log definido! ' + msg)
    }
  }
}