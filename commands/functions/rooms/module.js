module.exports = {
  
  trigger: "rooms",
  enabled: true,
  
  category: "Rooms",
  description: "Private Rooms",
  
  setup(Manager, db, googleKey) {
    db.defaults({
      channelLook: null,
      voiceCategory: null,
      textCategory: null,
      ctives: {}
    }).write()
  },
  
  execute() {
    
  },
}