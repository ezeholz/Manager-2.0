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
        args.shift()
        msg.channel.send(eval('Manager.'+args.join(' ')))
      }
      
    } else {
      const embed = new MessageEmbed().setColor('#dada3d')
        .setTitle(':no_entry_sign: Andateeeee')
        .setDescription('Papaaaaaaa, no ves que este comando no podés usarlo?')
      msg.channel.send(embed)
    }
  }
}