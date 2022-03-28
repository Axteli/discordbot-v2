const { readdirSync } = require("fs");
function loadButtons(client) {

	readdirSync("./buttons/").forEach(category => {

		readdirSync(`./buttons/${category}/`).forEach(buttonFile => {

			const button = require(`../buttons/${category}/${buttonFile}`);

			if (!button.name) {
				client.log.warn("button", buttonFile + " | ❌ Missing button name");
			}

			client.buttons.set(button.name, button);
			client.log.info("button", buttonFile + " | ✅");

		})

	});

}
module.exports = {
	loadButtons
}