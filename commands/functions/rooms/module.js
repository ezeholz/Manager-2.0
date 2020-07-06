module.exports = {
  
  trigger: "rooms",
  enabled: true,
  
  category: "Rooms",
  description: "Private Rooms",
  
  setup(Manager, db, googleKey) {
    db.defaults({
      channel: null,
      
    }).write()
  },
  
  execute() {
    
  },
}