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
          case 'add': db.get('streams').set(args[2],null).write(); break;
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
  },
  async check(Manager){
    const today = Date.now()
    
    let db = Manager.database.get('streams');
    
    const values = Manager.database.getState()
    
    const entries = Object.entries(db)
    const streamers = Object.keys(db)
    
    const online = entries.filter(e=>e[1]!==null)
    
    if(streamers.length){
      let response = await fetch('https://id.twitch.tv/oauth2/token?client_id='+Manager.twitchClient+'&client_secret='+Manager.twitchToken+'&grant_type=client_credentials',{method:'POST'})
      let json = await response.json()

      let auth = json.access_token

      response = await fetch('https://api.twitch.tv/helix/streams?user_login='+streamers.join('&user_login='),{headers:{
        'Client-ID': Manager.twitchClient,
        'Authorization': 'Bearer '+auth,
      }})
      json = await response.json()
      
      const offline = online.filter(e=>json.data.find(i=>i.user_name.toLowerCase()===e[0].toLowerCase())===undefined)
      
      offline.forEach(off => {
        db.set(off[0],null).write()
      })
      
      json.data.forEach(stream => {
        const found = entries.find(e => e[0].toLowerCase() === stream.user_name.toLowerCase())
        found.forEach(e => {
          if(e[1]===null){
            const embed = new MessageEmbed().setColor('#dada3d')
              .setTitle('No bueno.. '+stream.user_name+' está en directo!')
              .setDescription()
            Manager.client.channels.fetch(values.streamChat).then(channel => {channel.send(embed)})
          }
        })
      })
    }
  }
}