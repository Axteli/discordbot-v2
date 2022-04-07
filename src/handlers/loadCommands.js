const { readdirSync } = require("fs");

function loadCommands(client) {


	//set the commands discord collection
	client.categories.forEach(category => {

		readdirSync(`./src/interactions/commands/${category}`).forEach(commandFile => {


			const command = require(`../interactions/commands/${category}/${commandFile}`);

			if (!command.name || !command.description) {
				client.log.warn("command", commandFile + " | ❌ Missing name or description");
			}

			command.defaultPermission = command.ownerOnly ? false : true;

			client.commands.set(command.name, command);
			client.log.info("command", commandFile + " | ✅");


		});

	});
	//set slash commands on the support server
	client.guilds.fetch(process.env.SUPPORT_SERVER).then(guild => {

		if (guild) {

			client.log.info("command", `The support server is: ${guild.name}. Starting refreshing ${client.commands.size} slash commands...`);

			guild.commands.set(client.commands.map(cmd => cmd)).then((cmd) => {
				client.log.info("command", `Slash commands set on ${guild.name}!`);

				cmd.forEach(command => {

					const localCommand = client.commands.get(command.name);
					if (localCommand.ownerOnly) {

						client.application.commands.permissions.set({
							guild: guild.id, command: command.id,
							permissions: [
								{
									id: process.env.OWNER_ID,
									type: "USER",
									permission: true,
								},
							]
						});

					}

				});

			});


		} else {

			client.log.error("command", "Unable to find support server. Slash commands can't load correctly!");

		}


	});
}
module.exports = {
	loadCommands
};