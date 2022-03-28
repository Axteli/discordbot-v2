const DiscordBot = require("./helpers/Client.js")
const client = new DiscordBot();
require("dotenv").config();
const { loadEvents } = require("./handlers/loadEvents.js");
const { loadButtons } = require("./handlers/loadButtons.js");


//load events
loadEvents(client);
loadButtons(client)


//login to discord
client.login(process.env.DISCORD_TOKEN);


//log errors
process.on("unhandledRejection", (reason, promise) => {
	client.log.error("main", `Unhandled Rejection at: ${reason}\n${promise}`);
});

process.on('uncaughtException', (err, origin) => {

	client.log.error("main", `Caught exception: ${err} \nException origin: ${origin}`);

});