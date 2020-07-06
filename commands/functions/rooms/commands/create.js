const { MessageEmbed, GuildChannelManager } = require('discord.js')

module.exports = {
  
  trigger: "create",
  enabled: true,
  
  category: "Room",
  description: "Create rooms",
  
  async execute(Manager, author, guild) {
    let db = Manager.database;
    
    const values = db.getState()
    
    console.log(values[author.id])
    
    if(values[author.id]===undefined) { // No tiene creada una sala
      
      const name = guild.member(author.id).displayName
      
      let created = [null,null,null]
      
      // guild.channels.create('Salón de ' + name, {'parent':values.voiceCategory,'type':'voice'})
      //   .then(function(channel){
      //     created[0] = channel.id
      //     author.setChannel(channel)
      //   })
      // guild.channels.create('Notas de ' + name, {'parent':values.textCategory,'type':'text'})
      //   .then(function(channel){
      //     created[1] = channel.id
      //   })

      db.get('createdRooms')
        .set(author.id,created)
        .write();

      console.log(db.getState())
      
//       const values = db.getState()

//       const embed = new MessageEmbed()
//         .setTitle('Valores actuales')
//         .addFields(
//           {name: 'Channel to lookout', value: values.channelLook},
//           {name: 'Category for voice', value: values.voiceCategory},
//           {name: 'Category for text', value: values.textCategory},
//         )
//         .setColor('#dada3d')

//       msg.channel.send(embed)
    }
  }
}