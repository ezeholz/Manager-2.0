const ytdl = require('ytdl-core');
const { MessageEmbed } = require('discord.js')

module.exports = {
  
  trigger: "play",
  enabled: true,
  
  category: "Music",
  description: "Plays Music",
  
  execute(Manager, msg, args) {
    if (+msg.author.id === Manager.botAuthor) {
      /* 
      Este es un comando admin, por ende voy a detectar cuando soy yo el que lo usa, para que nadie más pueda cambiar eso
      Podría ponerle un generador de códigos, y que imprima el código por acá, tengo que ver todavía.
      */
      
      let db = Manager.database;
      
      if(args[2]) { // Si tiene para cambiarlo
        switch(args[1]){
          case 'stream': db.set('lofi', args[2]).write(); break;
          case 'lobby': db.set('lobby', args[2]).write(); break;
          default: break;
        }
      }
      
      const values = db.getState()
      
      const embed = new MessageEmbed().setColor('#dada3d')
        .setTitle('Valores actuales')
        .addFields(
          {name: 'Stream selected', value: values.lofi},
          {name: 'Lobby voice channel', value: values.lobby},
        )
      
      if (values.lofi && values.lobby && ytdl.validateURL(values.lofi)) {
        Manager.client.channels.fetch(values.lobby).then(channel => {
          const dispatcher = serverQueue.connection.playStream(ytdl(song.url, {
            filter: 'audioonly',
            quality: 'highestaudio',
            highWaterMark: 10 << 25
          })
        })
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