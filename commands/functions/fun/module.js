module.exports = {
  
  trigger: "fun",
  enabled: false,
  onStart: true,
  
  category: "Fun",
  description: "Diversion para el chat",
  
  setup(Manager, db, googleKey) {
    db.defaults({
      general: null, // Canal general
    }).write()
  },
  execute(Manager, msg, args) {
    
  },
}