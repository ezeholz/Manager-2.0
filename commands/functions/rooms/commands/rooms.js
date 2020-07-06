const { MessageEmbed } = require('discord.js')

module.exports = {
  
  trigger: "rooms",
  enabled: true,
  
  category: "Room",
  description: "Config to rooms, only for DoTPr0",
  
  execute(Manager, msg, args) {
    if (msg.author.id === 425678561295335425) {
      /* 
      Este es un comando admin, por ende voy a detectar cuando soy yo el que lo usa, para que nadie más pueda cambiar eso
      Podría ponerle un generador de códigos, y que imprima el código por acá, tengo que ver todavía.
      */
      
      let db = Manager.database;
      
      if(args[2]) { // Si tiene para cambiarlo
        switch(args[1]){
          case 'look': db.set('channelLook', args[2]); break;
          case 'voice': db.set('voiceCategory', args[2]); break;
          case 'text': db.set('textCategory', args[2]); break;
          default: break;
        }
      }
      
      const embed = new MessageEmbed()
        .setTitle('Valores actuales')
        
      
    } else {
      // Permisos insuficientes
    }
  }
}