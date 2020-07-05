const fs = require('fs');
const path = require('path');

const Discord = require('discord.js');

class Manager {
	/**
	 * Place Discord Token And Google API Key in musicbot.js {Mandatory}
	 */
	constructor(options) {
		if (!options || !options.discordToken || !options.googleKey || !options.geniusKey) {
			throw new Error('Either Token or Google Key is Missing');
		}

		this.discordToken = options.discordToken;
		this.googleKey = options.googleKey;
    this.geniusKey = options.geniusKey;
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

		const commandFiles = fs.readdirSync(path.join(__dirname, '/commands')).filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const command = require(`./commands/${file}`);
			this.client.commands.set(command.name, command);
		}

		this.client.once('ready', () => {  ///Status
			console.log('Bot is ready!');
			this.client.user.setActivity('.help', { type: 'STREAMING', url: "https://www.twitch.tv/dotpr0/" });
		});

    this.client.on("unhandledRejection", e => console.error(e));
    
    this.client.on('message', message => {
		});
	}
}

module.exports = Manager;