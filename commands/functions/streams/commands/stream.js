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
      
      if(args[1]) db.get('streams').set(args[1],null).write()
      
      const values = db.getState()
      
      const embed = new MessageEmbed().setColor('#dada3d')
        .setTitle('Valores actuales')
      
      if(Object.keys(values.streams).length){
        embed.addFields(
          {name: 'Streams', value: Object.keys(values.streams)},
        )
      } else {
        embed.addFields(
          {name: 'Streams', value: 'null'},
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
    
    let db = Manager.database;
    
    const entries = Object.entries(db.get('streams'))
    const streamers = Object.keys(db.get('streams'))
    
    const online = entries.filter(e=>e[0]!==null)
    
    if(streamers.length){
      let response = await fetch('https://id.twitch.tv/oauth2/token?client_id='+Manager.twitchClient+'&client_secret='+Manager.twitchToken+'&grant_type=client_credentials',{method:'POST'})
      let json = await response.json()

      let auth = json.access_token

      response = await fetch('https://api.twitch.tv/helix/streams?user_login='+streamers.join('&user_login='),{headers:{
        'Client-ID': Manager.twitchClient,
        'Authorization': 'Bearer '+auth,
      }})
      json = await response.json()
      
      json.data.forEach(stream => {
        const found = entries.find(e => e[0].toLowerCase() === stream.user_name.toLowerCase())
        
      })
    }
  }
}