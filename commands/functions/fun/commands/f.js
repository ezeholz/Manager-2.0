const { MessageEmbed } = require('discord.js')

module.exports = {
  
  trigger: "f",
  enabled: true,
  inProgress: false,
  
  category: "Fun",
  description: "F train!",
  
  execute(Manager, msg, args) {
    if (args[1] && +msg.author.id === +Manager.botAuthor) {
      Manager.database.set('general',args[1]).write();
    } else {
      const embed = new MessageEmbed().setColor('#dada3d')
        .setTitle(':no_entry_sign: Andateeeee')
        .setDescription('Papaaaaaaa, no ves que este comando no podés usarlo?')
      msg.channel.send(embed)
    }
  }
}