const { Client, Collection, Intents } = require("discord.js");
const { readdirSync } = require("fs");

class DiscordBot extends Client {


	constructor() {

		super({

			intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MESSAGES,
			]

		});


		//create all collections for commands
		this.commands = new Collection();
		this.description = new Collection();
		this.categories = readdirSync('./commands/');

		this.buttons = new Collection();


		this.log = require("./logger.js");


	};


}

module.exports = DiscordBot;