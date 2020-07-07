module.exports = {
  
  trigger: "music",
  enabled: true,
  
  category: "Music",
  description: "Music Bot",
  
  setup(Manager, db, googleKey) {
    // db.defaults({
    //   channelLook: null, // Canal donde se fija para crear
    //   voiceCategory: null, // Categoría para crear los de voz
    //   textCategory: null, // Categoría para crear los de texto
    //   createdRooms: {}, // Salas activas ex: {'DoTPr0': [audio,texto,date]}
    // }).write()
    
    db.defaults({
      lofi: [], // Canal de Youtube de Música
      //loop: false, // Si loopea
      lobby: null, // Voice de AFK (Para la musiquita)
    }).write()
    
    if(!googleKey) {
      this.enabled = false
    }
    
  },
  
  execute(Manager, msg, args) {
    
  },
}