const { loadCommands } = require("../../handlers/loadCommands")
const { loadCommands } = require("../../handlers/loadCommands");
const { loadButtons } = require("../../handlers/loadButtons");
module.exports = {
	name: 'ready',
	async run(client) {


		client.log.info("main", "Bot logged as: " + client.user.tag);


		loadCommands(client);
		loadButtons(client);
	}
};