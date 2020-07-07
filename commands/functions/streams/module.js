module.exports = {
  
  trigger: "streams",
  enabled: true,
  
  category: "Streams",
  description: "Streaming on Twitch",
  
  setup(Manager, db, googleKey) {
    db.defaults({
      
    }).write()
    
  },
  
  execute(Manager, msg, args) {
    
  },
}