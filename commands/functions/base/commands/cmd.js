const { MessageEmbed } = require('discord.js')

module.exports = {
  
  trigger: "cmd",
  enabled: true,
  
  category: "Base",
  description: "Make a command into the code",
  
  execute(Manager, msg, args) {
    if (+msg.author.id === +Manager.botAuthor) {
      /* 
      Este es un comando admin, por ende voy a detectar cuando soy yo el que lo usa, para que nadie más pueda cambiar eso
      Podría ponerle un generador de códigos, y que imprima el código por acá, tengo que ver todavía.
      */
      
      if(args[1]){
        if(args[1]!=='set') {
          args.shift()
          console.log(args.join(' '))
          const response = JSON.stringify(eval(args.join(' ')))
          console.log(response)
          msg.channel.send({'content':'```'+response+'```'})
          try{
            msg.channel.messages.fetch(Manager.database.get('cmd')).then(msg=>{
              msg.edit({'content':'```'+response+'```'})
            })
          } catch(err){
            
          }
        } else {
          
        }
      }
      
    } else {
      const embed = new MessageEmbed().setColor('#dada3d')
        .setTitle(':no_entry_sign: Andateeeee')
        .setDescription('Papaaaaaaa, no ves que este comando no podés usarlo?')
      msg.channel.send(embed)
    }
  }
}