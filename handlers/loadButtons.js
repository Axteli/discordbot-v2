const { readdirSync } = require("fs");
function loadButtons(client) {

	readdirSync("./buttons/").forEach(category => {

		readdirSync(`./buttons/${category}/`).forEach(buttonFile => {

			const button = require(`../buttons/${category}/${buttonFile}`);
			client.buttons.set(button.name, button);

		})

	});

}
module.exports = {
	loadButtons
}