const { MessageEmbed } = require('discord.js')

module.exports = {
  
  trigger: "streams",
  enabled: true,
  onStart: true,
  interval: null,
  
  category: "Streams",
  description: "Streaming on Twitch",
  
  setup(Manager, db, googleKey) {
    db.defaults({
      streams: {},
      streamChat: null,
      streamChannel: null,
      allowRole: null,
    }).write()
    
  },
  
  execute(Manager, msg, args) {
    
  },
  start(Manager){
    if (this.enabled) {
      this.interval = setInterval(() => {
        this.check(Manager)
      },10*1000)
    } else {
      if(this.interval) clearInterval(this.interval)
      this.interval = null
    }
  },
  async check(Manager){
    const today = Date.now()
    
    let db = Manager.database.get('streams').value();
    let dbm = Manager.database.get('streams');
    
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
      
      let offline
      
      response = await fetch('https://api.twitch.tv/helix/users?login='+streamers.join('&login='),{headers:{
        'Client-ID': Manager.twitchClient,
        'Authorization': 'Bearer '+auth,
      }})
      const imgs = await response.json()
      
      if(json.data===undefined){
        offline = online
      } else {
        offline = online.filter(e=>json.data.find(i=>i.user_name.toLowerCase()===e[0].toLowerCase())===undefined)
      }
      
      offline.forEach(off => {
        const img = imgs.data.find(e => e.login.toLowerCase() === off[0].toLowerCase())
        Manager.client.channels.fetch(values.streamChat).then(channel=>{
          channel.messages.fetch(off[1]).then(msg=>{
            msg.edit({'content':'Este directo está offline. Follow para no perderte el siguiente! ||@here||','embed':{
              "title": img.display_name,
              "description": img.description,
              "url": 'https://www.twitch.tv/'+img.login,
              "color": 14342717,
              "timestamp": new Date().toISOString(),
              "thumbnail": {
                "url": img.profile_image_url
              }
            }}).then(()=>dbm.set(off[0],null).write())
          })
        })
      })
      
      json.data.forEach(stream => {
        const found = entries.find(e => e[0].toLowerCase() === stream.user_name.toLowerCase())
        if(found[1]===null){
          const img = imgs.data.find(e => +e.id === +stream.user_id)
          const embed = new MessageEmbed().setColor('#dada3d')
            .setTitle(stream.title)
            .setURL('https://www.twitch.tv/'+stream.user_name)
            .setAuthor(stream.user_name,img.profile_image_url,'https://www.twitch.tv/'+stream.user_name)
            .setTimestamp(stream.started_at)
            .setImage(stream.thumbnail_url.replace('{width}','1920').replace('{height}','1080'))
          Manager.client.channels.fetch(values.streamChat).then(channel => {
            channel.send({'content':'No bueno.. '+stream.user_name+' está en directo! ||@everyone||','embed':embed}).then(msg=>{
              dbm.set(found[0],msg.id).write()
            })
          })
        }
      })
    }
  }
}