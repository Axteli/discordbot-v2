const Discord = require("discord.js");
const intents = Discord.Intents;
const client = new Discord.Client({intents: [intents.FLAGS.GUILDS, intents.FLAGS.GUILD_MESSAGES]});
const config = require("./config.json");
const fs = require("fs")

const loadCommands = require("./handlers/loadCommands.js");
const loadEvents = require("./handlers/loadEvents.js");


//create all collections for commands
client.commands = new Discord.Collection();
client.description = new Discord.Collection();
client.usage = new Discord.Collection();
client.example = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync('./commands/');


//execute handlers
loadCommands(client);
loadEvents(client);


//login
client.login(config.token);