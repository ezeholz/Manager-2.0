const { MessageEmbed } = require('discord.js')

module.exports = {
  
  trigger: "create",
  enabled: true,
  
  category: "Room",
  description: "Create rooms",
  
  execute(Manager, msg, args) {
    const embed = new MessageEmbed().setColor('#dada3d')
        .setTitle(':no_entry_sign: Andateeeee')
        .setDescription('Papaaaaaaa, no ves que este comando no podés usarlo?')
      
    msg.channel.send(embed)
  },
  
  async voice(Manager, author, guild) {
    let db = Manager.database;
    
    const values = db.getState()
    
    if(values.createdRooms[author.id]===undefined) { // No tiene creada una sala
      
      const name = guild.member(author.id).displayName
      
      let created = [null,null,null]
      
      const embed = new MessageEmbed()
        .setTitle('<:CarryMe:505991252311932929> Comandos')
        .addFields(
          {name: '.invite [Usuario]', value: 'Invitar a un usuario a tu sala'},
          {name: '.kick [Usuario]', value: 'Sacar a un usuario de tu sala'},
          {name: '.remove', value: 'Borrar la sala'},
        )
        .setColor('#dada3d')
      
      await guild.channels.create('Salón de ' + name, {'parent':values.voiceCategory,'type':'voice'})
        .then(function(channel){
          channel.createOverwrite(author.user,{ CONNECT: true })
          created[0] = channel.id
          author.setChannel(channel)
        })
      await guild.channels.create('Notas de ' + name, {'parent':values.textCategory,'type':'text'})
        .then(function(channel){
          created[1] = channel.id
          channel.createOverwrite(author.user,{ VIEW_CHANNEL: true })
          channel.send(embed)
        })

      db.get('createdRooms')
        .set(author.id,created)
        .write();
      
    } else {
      author.setChannel(values.createdRooms[author.id][0])
    }
  }
}