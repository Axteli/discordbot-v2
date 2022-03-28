const DiscordBot = require("./helpers/Client.js")
const client = new DiscordBot();
require("dotenv").config();
const { loadEvents } = require("./handlers/loadEvents.js");


//load events
loadEvents(client);
loadButtons(client)


//login to discord
client.login(process.env.DISCORD_TOKEN);


//login
client.login(process.env.DISCORD_TOKEN);