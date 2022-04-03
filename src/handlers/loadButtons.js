const { readdirSync } = require("fs");
function loadButtons(client) {

	readdirSync("./src/interactions/buttons/").forEach(category => {

		readdirSync(`./src/interactions/buttons/${category}/`).forEach(buttonFile => {

			const button = require(`../interactions/buttons/${category}/${buttonFile}`);

			if (!button.name) {
				client.log.warn("button", buttonFile + " | ❌ Missing button name");
			}

			client.buttons.set(button.name, button);
			client.log.info("button", buttonFile + " | ✅");

		});

	});

}
module.exports = {
	loadButtons
};