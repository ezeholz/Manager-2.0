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
      console.log(mod)
    })
    
		// for (const file of commandFiles) {
		// 	const command = require(`./commands/${file}`);
		// 	this.client.commands.set(command.name, command);
		// }

		this.client.once('ready', () => {  ///Status
			console.log('Bot is ready!');
			this.client.user.setActivity('.help', { type: 'STREAMING', url: "https://www.twitch.tv/dotpr0/" });
		});

    this.client.on("unhandledRejection", e => console.error(e));
    
    this.client.on('message', message => {
      
		});
    
    this.client.on('voiceStateUpdate', (oldMember, newMember) => {
      const newUserChannel = newMember.voiceChannel
      const oldUserChannel = oldMember.voiceChannel
      
      
    })
	}
}

module.exports = Manager;