module.exports = {
  
  trigger: "base",
  enabled: true,
  
  category: "Base",
  description: "Comandos Básicos",
  
  setup(Manager, db, googleKey) {
    db.defaults({
      log: null, // Canal donde se manda el log
      cmd: null,
    }).write()
  },
  
  execute(Manager, msg, args) {
    
  },
}