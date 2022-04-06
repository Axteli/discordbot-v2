const DiscordBot = require("./structure/Client.js");
const client = new DiscordBot();
const mongoose = require("mongoose");
require("dotenv").config();
const { loadEvents } = require("./handlers/loadEvents.js");
const { loadButtons } = require("./handlers/loadButtons.js");
const { loadSelectMenus } = require("./handlers/loadSelectMenus.js");


//load events
loadEvents(client);
loadButtons(client);
loadSelectMenus(client);


//login to discord
client.login(process.env.DISCORD_TOKEN);



//login to the mongoDB database
mongoose.connect(process.env.MONGO_DB);

mongoose.connection.once("open", () => {
	client.log.info("main", "Connected to mongoDB!");
});



//log errors
process.on("unhandledRejection", (reason, promise) => {
	client.log.error("main", `Unhandled Rejection at: ${reason}\n${JSON.stringify(promise)}`);
});

process.on("uncaughtException", (err, origin) => {

	client.log.error("main", `Caught exception: ${err} \nException origin: ${origin}`);

});