const { MessageEmbed } = require('discord.js')

module.exports = {
  
  trigger: "play",
  enabled: true,
  
  category: "Music",
  description: "Plays Music",
  
  execute(Manager, msg, args) {
    if (+msg.author.id === +Manager.botAuthor) {
      /* 
      Este es un comando admin, por ende voy a detectar cuando soy yo el que lo usa, para que nadie más pueda cambiar eso
      Podría ponerle un generador de códigos, y que imprima el código por acá, tengo que ver todavía.
      */
      
      let db = Manager.database;
      
      if(args[2]) { // Si tiene para cambiarlo
        switch(args[1]){
          case 'stream': db.get('lofi').push(args[2]).write(); break;
          case 'lobby': db.set('lobby', args[2]).write(); break;
          default: break;
        }
      } else if (args[1]==='stream') {db.set('lofi', []).write()}
      
      const values = db.getState()
      
      const embed = new MessageEmbed().setColor('#dada3d')
        .setTitle('Valores actuales')
        .addFields(
          {name: 'Stream selected', value: values.lofi},
          {name: 'Lobby voice channel', value: values.lobby},
        )
      
      //this.start(Manager)
      
      msg.channel.send(embed)
      
    } else {
      const embed = new MessageEmbed().setColor('#dada3d')
        .setTitle(':no_entry_sign: Andateeeee')
        .setDescription('Papaaaaaaa, no ves que este comando no podés usarlo?')
      msg.channel.send(embed)
    }
  }
}