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
      this.aniadir = 0;
      this.lyrics = false;
      const channel = this.client.channels.get("505503301576556546");// //704771680224149555
      if (!channel) return console.error("The channel does not exist!");
        channel.join().then(connection => {
        // Yay, it worked!
        console.log("Successfully connected.");
      }).catch(e => {
        // Oh no, it errored! Let's log it to console :)
        console.error(e);
      })
      const oktext = this.client.channels.get("729209240337776740");
      oktext.send("Ready")
		});

    this.client.on("unhandledRejection", e => console.error(e));
    
    this.client.on('message', message => {   //Main Argument Call
      this.trivia = false
      if (this.queue.get(message.guild.id) !== undefined && this.queue.get(message.guild.id).trivia && !message.author.bot) {
        this.client.commands.get("trivia").execute(message, this.queue.get(message.guild.id), this);
        this.trivia = true
      }
      
      this.hidden = false;
			if (message.author.bot || !message.content.startsWith(this.prefix)) {
        if(message.content.startsWith("||"+this.prefix)&&message.content.endsWith("||")) {
          message.content = message.content.slice(2).slice(0,-2);
          this.hidden = true;
        } else return
			}
            
      
      
      if (message.content === ".join") {
        this.client.commands.get("play").execute(message, "mii music 10 hours", this);
        return;
      }
      
      const argss = message.content.slice(this.prefix.length);
      
			const args = message.content.slice(this.prefix.length).split(/ +/); //Slicing Prefix
			const command = args.shift().toLowerCase();
      
			const arg = args.join(' ');

      if(this.aniadir) {this.client.commands.get("add").execute(message, argss, this);return;}
      
			if (!this.client.commands.has(command) && !this.trivia) {
        if (argss.includes("list")){
          this.client.commands.get("playlist").execute(message, argss, this);
        } else
        if (command === "s") {
          try {
            this.client.commands.get("skip").execute(message, arg, this);  //Help available for the commands goes here 
          } catch (error) {
            console.error(error);
          }
        } else if (command === "" && this.queue.get(message.guild.id) !== undefined && !this.queue.get(message.guild.id).pause) {
          this.client.commands.get("pause").execute(message, arg, this);
        } else {
          try {
            this.client.commands.get("play").execute(message, argss, this);  //Help available for the commands goes here 
          } catch (error) {
            console.error(error);
          }
        }
				return
			}

			try {
				if(!this.trivia)this.client.commands.get(command).execute(message, arg, this);  //Help available for the commands goes here 
			} catch (error) {
				console.error(error);
			}
		});
	}
}

module.exports = Manager;