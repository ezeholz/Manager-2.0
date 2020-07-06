const { MessageEmbed } = require('discord.js')

module.exports = {
  
  trigger: "create",
  enabled: true,
  
  category: "Room",
  description: "Create rooms",
  
  execute(Manager, author) {
    let db = Manager.database;

//     if(args[2]) { // Si tiene para cambiarlo
//       switch(args[1]){
//         case 'look': db.set('channelLook', args[2]).write(); break;
//         case 'voice': db.set('voiceCategory', args[2]).write(); break;
//         case 'text': db.set('textCategory', args[2]).write(); break;
//         default: break;
//       }
//     }

//     const values = db.getState()

//     const embed = new MessageEmbed()
//       .setTitle('Valores actuales')
//       .addFields(
//         {name: 'Channel to lookout', value: values.channelLook},
//         {name: 'Category for voice', value: values.voiceCategory},
//         {name: 'Category for text', value: values.textCategory},
//       )
//       .setColor('#dada3d')

//     msg.channel.send(embed)
    
    db.DoTPr0 = [123,456,null]
    db.write();
  }
}