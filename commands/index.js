const fs = require('fs');
const path = require('path');

const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')

class Manager {
	/**
	 * Place Discord Token And Google API Key in musicbot.js {Mandatory}
	 */
	constructor(options) {
		if (!options || !options.discordToken || !options.botAuthor) {
			throw new Error('Discord Token or Author is Missing');
		}
    
    if (!options.googleKey) {
      console.error('Google Token Missing, not being able to play music')
    }
    
		this.discordToken = options.discordToken;
		this.googleKey = options.googleKey;
		this.prefix = options.prefix || '.'; //Prefix setup
    this.botAuthor = options.botAuthor;
    this.twitchClient = options.twitchClient;
    this.twitchToken = options.twitchToken;
    
    this.database = options.database;

		this.queue = new Map();

		this.setup_();
	}
  
  async start() {
		await this.client.login(this.discordToken);
	}
  
  setup_() {
		this.client = new Discord.Client();
		this.client.commands = new Discord.Collection();  ///Command Handler
    this.client.modules = {};

		const commandFiles = fs.readdirSync(__dirname + '/functions').filter(file => fs.statSync(path.join(__dirname + '/functions', file)).isDirectory());

    commandFiles.forEach(mod => {
      fs.readdir(__dirname + '/functions/' + mod + '/commands/', (err, files) => {
        let error = false
        
        let module = require(__dirname + '/functions/' + mod + '/module.js');
        module.setup(this, this.database, this.googleKey)
        let comArr = []
        
        try {
        files.forEach(file => {
          
          try {
            
            let temp = require(__dirname + '/functions/' + mod + '/commands/' + file);
            
            this.client.commands[temp.trigger] = temp
            this.client.commands[temp.trigger].module = mod
            comArr.push(temp.trigger)
            
          } catch (err) {
            error = true
            console.error(mod + " / " + file + " Unable to load " + err)
          }
        })} catch (err) {
            error = true
            console.error(mod + " Unable to load " + err)
          }
        if (!error) {
          this.client.commands[module.trigger] = module
          this.client.commands[module.trigger].commands = comArr
          this.client.modules[mod] = module.trigger
        }
      })
    })
    
    console.log(this.database.getState())
    
		// for (const file of commandFiles) {
		// 	const command = require(`./commands/${file}`);
		// 	this.client.commands.set(command.name, command);
		// }

		this.client.once('ready', () => {  ///Status
			console.log('Bot is ready!');
			this.client.user.setActivity('DoTPr0 ;3', { type: 'STREAMING', url: "https://www.twitch.tv/dotpr0/" });
      
      if (this.client.commands['log'].enabled) {
        this.client.commands['log'].log(this,'Bot Reiniciado')
      }
      
      Object.values(this.client.modules).forEach(a=>{
        let mod = this.client.commands[a]
        if(mod.onStart) mod.start(this)
      })
      
    });

    this.client.on("unhandledRejection", e => console.error(e));
    
    // ------------------------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------Message---------------------------------------------------------
    // ------------------------------------------------------------------------------------------------------------------------
    
    this.client.on('message', msg => {
      if(!msg.author.bot && msg.content.startsWith(this.prefix)) {
        const args = msg.content.slice(this.prefix.length).split(/ +/); //Slicing Prefix
			  const command = this.client.commands[args[0].toLowerCase()];
        
        if (command!==undefined) {
          if (command.enabled && this.client.commands[command.module].enabled) {
            command.execute(this, msg, args)
          } else {
            const embed = new MessageEmbed().setColor('#dada3d')
              .setTitle(':no_entry_sign: Uf, Big F Time')
              .setDescription('Capaz no te lo crees cuando te lo diga, pero este comando no está habilitado.')

            msg.channel.send(embed)
          }
        } else {
          const embed = new MessageEmbed().setColor('#dada3d')
            .setTitle(':no_entry_sign: Flashaste amego')
            .setDescription('Ey bro, buena imaginación, pero ese comando no existe.')

          msg.channel.send(embed)
        }
      } //else if(msg.content.includes(/\bf\b/gi) && this.client.commands['f'].enabled && this.client.commands['fun'].enabled) {
        //this.client.commands['f'].execute(this, msg, ['f',undefined])
      //}
		});
    
    // ------------------------------------------------------------------------------------------------------------------------
    // ---------------------------------------------------------Voice----------------------------------------------------------
    // ------------------------------------------------------------------------------------------------------------------------
    
    this.client.on('voiceStateUpdate', (old, neww) => {
      const newUserChannel = neww.channelID
      const oldUserChannel = old.channelID
      
      const command = this.client.commands;
      
      if (command['create'].enabled && command['rooms'].enabled) {
        if(newUserChannel !== null && newUserChannel.toString() === this.database.get('channelLook').value()) {
          command['create'].voice(this, neww, neww.guild)
        }
      } 
      
      if(command['music'].enabled) {
        if(newUserChannel !== null && newUserChannel.toString() === this.database.get('lobby').value()) {
          if (this.client.dispatcher!==undefined && !this.client.dispatcher.speaking) command['music'].start(this)
        }
      }
    })
    
    // ------------------------------------------------------------------------------------------------------------------------
    // ---------------------------------------------------------Edit-----------------------------------------------------------
    // ------------------------------------------------------------------------------------------------------------------------
    
    this.client.on('messageUpdate', (old, neww) => {
      const command = this.client.commands;
      
      const args = neww.content.slice(this.prefix.length).split(/ +/);
      
      if (command['cmd'].enabled && command['base'].enabled && neww.content.startsWith(this.prefix+'cmd')) {
        command['cmd'].execute(this, neww, args)
      }
    })
    
    // ------------------------------------------------------------------------------------------------------------------------
    // -------------------------------------------------------Reactions--------------------------------------------------------
    // ------------------------------------------------------------------------------------------------------------------------
    
//     this.client.on('messageReactionAdd', (msg, user) => {
//       const command = this.client.commands;
      
//       if (command['lets'].enabled && command['streams'].enabled && Object.values(this.database.get('streams').value()).includes(msg.message.id)){
        
//       }
//     })
    
	}
}

module.exports = Manager;