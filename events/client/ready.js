const { loadCommands } = require("../../handlers/loadCommands")
module.exports = {
	name: 'ready',
	async run(client) {
		client.log.info("main", "Bot logged as: " + client.user.tag)


		loadCommands(client);
	}
}