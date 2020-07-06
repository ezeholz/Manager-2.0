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
      roomOwners: [], // Array de nombres de dueños
      permission: {}, // Permisos de ingreso ex: {'DoTPr0': [Wephrix,Ace]}
    }).write()
  },
  
  execute() {
    
  },
}