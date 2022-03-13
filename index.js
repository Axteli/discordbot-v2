const DiscordBot = require("./helpers/Client.js")
const client = new DiscordBot();
require("dotenv").config();
const { loadCommands } = require("./handlers/loadCommands.js");
const { loadEvents } = require("./handlers/loadEvents.js");


//execute handlers

loadEvents(client);


//login
client.login(process.env.DISCORD_TOKEN);