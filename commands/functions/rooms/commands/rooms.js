module.exports = {
  
  trigger: "rooms",
  enabled: true,
  
  category: "Room",
  description: "Config to rooms, only for DoTPr0",
  
  execute(Manager, msg, args) {
    if (msg.author.id === 425678561295335425) {
      /* 
      
      Este es un comando admin, por ende voy a detectar cuando soy yo el que lo usa, para que nadie más pueda cambiar eso
      Podría ponerle un generador de códigos, y que imprima el código por acá, tengo que ver todavía.
      
      */
      
      
      
    } else {
      // Permisos insuficientes
    }
  }
}