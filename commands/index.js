const fs = require('fs');
const path = require('path');

const Discord = require('discord.js');

class Manager {
	/**
	 * Place Discord Token And Google API Key in musicbot.js {Mandatory}
	 */
	constructor(options) {
		if (!options || !options.discordToken) {
			throw new Error('Discord Token is Missing');
		}
    
    if (!options.googleKey) {
      console.error('Google Token Missing, not being able to play music')
    }
    
		this.discordToken = options.discordToken;
		this.googleKey = options.googleKey;
		this.prefix = options.prefix || '.'; //Prefix setup
    
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
        files.forEach(file => {
          try {
            
            let temp = require(__dirname + '/functions/' + mod + '/commands/' + file);
            
            this.client.command[temp.trigger] = temp
            this.client.command[temp.trigger].module = mod
            
          } catch (err) {
            error = true
            console.error(mod + " / " + file + " Unable to load " + err)
          }
        })
        if (!error) {
          this.client.command[mod.trigger] = mod
        }
      })
    })
    
		// for (const file of commandFiles) {
		// 	const command = require(`./commands/${file}`);
		// 	this.client.commands.set(command.name, command);
		// }

		this.client.once('ready', () => {  ///Status
			console.log('Bot is ready!');
			this.client.user.setActivity('DoTPr0 ;3', { type: 'STREAMING', url: "https://www.twitch.tv/dotpr0/" });
		});

    this.client.on("unhandledRejection", e => console.error(e));
    
    this.client.on('message', message => {
      
		});
    
    this.client.on('voiceStateUpdate', (old, neww) => {
      const newUserChannel = neww.voiceChannel
      const oldUserChannel = old.voiceChannel
      
      
    })
	}
}

module.exports = Manager;