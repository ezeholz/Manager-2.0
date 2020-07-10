module.exports = {
  
  trigger: "rooms",
  enabled: true,
  onStart: true,
  interval: null,
  
  category: "Rooms",
  description: "Private Rooms",
  
  setup(Manager, db, googleKey) {
    db.defaults({
      channelLook: null, // Canal donde se fija para crear
      voiceCategory: null, // Categoría para crear los de voz
      textCategory: null, // Categoría para crear los de texto
      createdRooms: {}, // Salas activas ex: {'DoTPr0': [audio,texto,date]}
    }).write()
    
  },
  
  execute(Manager, msg, args) {
    
  },
  start(Manager){
    if (this.enabled) {
      this.interval = setInterval(() => {
        this.timer(Manager)
      },10*1000)
    } else {
      if(this.interval) clearInterval(this.interval)
      this.interval = null
    }
  },
  timer(Manager){
    const today = Date.now()
    
    let db = Manager.database;
    
    const values = Object.entries(db.get('createdRooms').value())
    
    values.forEach(room => {
      Manager.client.channels.fetch(room[1][0]).then(e => {
        if(!e.members.array().length) { // Si la sala no tiene personas
          if(room[1][2]===null) {
            db.get('createdRooms')
              .set(room[0],[room[1][0],room[1][1],today])
              .write()
            return
          } else if (Math.floor((today-room[1][2])/60000)>10){
            Manager.client.channels.fetch(room[1][0]).then(channel => {channel.delete()})
            Manager.client.channels.fetch(room[1][1]).then(channel => {channel.delete()})
            db.get('createdRooms').unset(room[0]).write()
          }
        } else {
          if(room[1][2]!==null) {
            db.get('createdRooms')
              .set(room[0],[room[1][0],room[1][1],null])
              .write()
            return
          }
        }
      })
    })
  }
}