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
      activeRooms: {}, // Salas activas ex: {'DoTPr0': [audio,texto]}
      roomOwners: [], // Array de nombres de dueños
      permission: {},
    }).write()
  },
  
  execute() {
    
  },
}