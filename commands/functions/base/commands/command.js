const { MessageEmbed } = require('discord.js')

module.exports = {
  
  trigger: "command",
  enabled: true,
  
  category: "Base",
  description: "Turn on and off commands",
  
  execute(Manager, msg, args) {
    if (+msg.author.id === +Manager.botAuthor) {
      /* 
      Este es un comando admin, por ende voy a detectar cuando soy yo el que lo usa, para que nadie más pueda cambiar eso
      Podría ponerle un generador de códigos, y que imprima el código por acá, tengo que ver todavía.
      */
      
      let db = Manager.database;
      let command = Manager.client.commands[args[1]]
      
      if(args[1] && command){
        if(command !== 'module' && command !== 'command'){
          let e = Manager.client.commands[command].enabled
          switch(e){
            case true: Manager.client.commands[module].enabled = false; Manager.client.commands[module].start(Manager); break;
            case false: Manager.client.commands[module].enabled = true; Manager.client.commands[module].start(Manager); break;
          }
        } else {
          const embed = new MessageEmbed().setColor('#dada3d')
            .setTitle(':no_entry_sign: Por ahí no es bro..')
            .setDescription('Amigo, Desactivás esto y estás fucked')
          msg.channel.send(embed)
        }
      } else if (args[1]){
        const embed = new MessageEmbed().setColor('#dada3d')
          .setTitle(':no_entry_sign: De qué.. Estás.. Hablando??')
          .setDescription('I know, no sos Elastigirl. Porfa revisá el nombre que no lo encuentro en la base, plis')
        msg.channel.send(embed)
      }
      
      const embed = new MessageEmbed().setColor('#dada3d')
        .setTitle('Valores actuales')
      
      Object.values(Manager.client.modules).forEach(a=>{
        let mod = Manager.client.commands[a]
        embed.addField(mod.category,(mod.enabled)?':white_check_mark:':':no_entry_sign:',true)
      })
      
      msg.channel.send(embed)
      
    } else {
      const embed = new MessageEmbed().setColor('#dada3d')
        .setTitle(':no_entry_sign: Andateeeee')
        .setDescription('Papaaaaaaa, no ves que este comando no podés usarlo?')
      msg.channel.send(embed)
    }
  }
}