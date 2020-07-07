const { MessageEmbed } = require('discord.js')

module.exports = {
  
  trigger: "play",
  enabled: true,
  
  category: "Music",
  description: "Plays Music",
  
  execute(Manager, msg, args) {
    
    const embed = new MessageEmbed().setColor('#dada3d')
      .setTitle(':no_entry_sign: Andateeeee')
      .setDescription('Papaaaaaaa, no ves que este comando no podés usarlo?')
    msg.channel.send(embed)
    
  }
}