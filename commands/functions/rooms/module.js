module.exports = {
  
  trigger: "rooms",
  enabled: true,
  
  category: "Rooms",
  description: "Private Rooms",
  
  setup(Manager, db, googleKey) {
    db.defaults({
      channelLook: null, // Canal donde se fija para crear
      voiceCategory: null, // Categoría para crear los de voz
      textCategory: null, // Categoría para crear los de texto
      createdRooms: {}, // Salas activas ex: {'DoTPr0': [audio,texto,date]}
    }).write()
    
    if(this.enabled){
      setInterval((Manager) => {
        Manager.client.commands['room'].remove(this)
        console.log('OK')
      },15*1000)
    }
    
    
    
  },
  
  execute(Manager, msg, args) {
    
  },
}