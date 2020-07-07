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
    
    this.database = options.database;

		this.queue = new Map();

		this.setup_();
	}
  
  start() {
		this.client.login(this.discordToken);
	}
  
  setup_() {
		this.client = new Discord.Client();
		this.client.commands = new Discord.Collection();  ///Command Handler

		const commandFiles = fs.readdirSync(__dirname + '/functions').filter(file => fs.statSync(path.join(__dirname + '/functions', file)).isDirectory());

    commandFiles.forEach(mod => {
      fs.readdir(__dirname + '/functions/' + mod + '/commands/', (err, files) => {
        let error = false
        
        let module = require(__dirname + '/functions/' + mod + '/module.js');
        module.setup(this, this.database, this.googleKey)
        
        files.forEach(file => {
          try {
            
            let temp = require(__dirname + '/functions/' + mod + '/commands/' + file);
            
            this.client.commands[temp.trigger] = temp
            this.client.commands[temp.trigger].module = mod
            
          } catch (err) {
            error = true
            console.error(mod + " / " + file + " Unable to load " + err)
          }
        })
        if (!error) {
          this.client.commands[mod.trigger] = module
        }
      })
    })
    
    //this.database.setState({}).write()
    
    //this.database.unset('loop').write()
    
    //this.database.set('createdRooms',{}).write()
    
    console.log(this.database.getState())
    
		// for (const file of commandFiles) {
		// 	const command = require(`./commands/${file}`);
		// 	this.client.commands.set(command.name, command);
		// }

		this.client.once('ready', () => {  ///Status
			console.log('Bot is ready!');
			this.client.user.setActivity('DoTPr0 ;3', { type: 'STREAMING', url: "https://www.twitch.tv/dotpr0/" });
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
      }
		});
    
    // ------------------------------------------------------------------------------------------------------------------------
    // ---------------------------------------------------------Voice----------------------------------------------------------
    // ------------------------------------------------------------------------------------------------------------------------
    
    this.client.on('voiceStateUpdate', (old, neww) => {
      const newUserChannel = neww.channelID
      const oldUserChannel = old.channelID
      
      const command = this.client.commands;
      
      if (command['create'].enabled && command[command['create'].module].enabled) {
        if(newUserChannel !== null && newUserChannel === this.database.get('channelLook').value()) {
          command['create'].voice(this, neww, neww.guild)
        }
      }
      
    })
    
	}
}

module.exports = Manager;