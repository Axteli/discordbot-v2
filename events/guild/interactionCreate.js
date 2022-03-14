module.exports = {
	name: "interactionCreate",
	run(client, interaction) {


		if (interaction.isCommand()) {

			const command = client.commands.get(interaction.commandName);
			command.run(client, interaction);

		} else if (interaction.isButton()) {

			const button = client.buttons.get(interaction.customId);
			button.run(client, interaction);

		};


	}
};