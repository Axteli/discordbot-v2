const { readdirSync } = require("fs");

function loadEvents(client) {

	readdirSync("./events/").forEach(category => {

		readdirSync(`./events/${category}`).forEach(eventFile => {

			const event = require(`../events/${category}/${eventFile}`);
			if (event.name) {

				client.on(event.name, (...args) => event.run(client, ...args));
				client.log.info("event", eventFile + " | ✅");

			} else {

				client.log.warn("event", eventFile + " | ❌ Missing event name");

			};

		});

	});


};
module.exports = {
	loadEvents
};