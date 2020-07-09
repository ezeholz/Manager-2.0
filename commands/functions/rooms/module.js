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
    if (this.enabled && Manager.client.commands['room'].enabled) {
      this.interval = setInterval(() => {
        Manager.client.commands['room'].remove(this)
      },10*1000)
    } else {
      if(this.interval) clearInterval(this.interval)
      this.interval = null
    }
  }
}