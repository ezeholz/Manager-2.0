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
        if(args[1]!=='set' && args[1]!=='unset') {
          args.shift()
          console.log(args.join(' '))
          let response
          
          try{response = JSON.stringify(eval(args.join(' ')))}
          catch(err){response = JSON.stringify(err)}
          
          console.log(response)
          
          let cmd = Manager.database.get('cmd').value()
          
          if(cmd){
            msg.channel.messages.fetch(cmd).then(msg2=>{
              msg2.edit({'content':'```'+response+'```'})
            })
          } else {
            msg.channel.send({'content':'```'+response+'```'})
          }
        } else {
          switch(args[1]){
            case 'set': Manager.database.set('cmd',args[2]).write();break;
            case 'unset': Manager.database.unset('cmd').write();break;
          }
          
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