module.exports = {
  
  trigger: "base",
  enabled: true,
  
  category: "Base",
  description: "Comandos Básicos",
  
  setup(Manager, db, googleKey) {
    db.defaults({base:'holi'}).write()
  },
  
  execute() {
    
  },
}