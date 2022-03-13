const { readdirSync } = require("fs");

async function loadEvents(client) {

	readdirSync("./events/").forEach(category => {

		readdirSync(`./events/${category}`).forEach(eventFile => {

			const event = require(`../events/${category}/${eventFile}`);
			client.on(event.name, (...args) => event.run(client, ...args));
			client.log.info("event", "event " + event.name + " loaded!");

		});

	});


};
module.exports = {
	loadEvents
};