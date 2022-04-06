const { readdirSync } = require("fs");
function loadSelectMenus(client) {

	readdirSync("./src/interactions/selectMenus/").forEach(category => {

		readdirSync(`./src/interactions/selectMenus/${category}/`).forEach(menuFile => {

			const selectMenu = require(`../interactions/selectMenus/${category}/${menuFile}`);

			if (!selectMenu.name) {
				return client.log.warn("selectMenu", menuFile + " | ❌ Missing select Menu name");
			}

			client.selectMenus.set(selectMenu.name, selectMenu);
			client.log.info("selectMenu", menuFile + " | ✅");

		});

	});

}
module.exports = {
	loadSelectMenus
};