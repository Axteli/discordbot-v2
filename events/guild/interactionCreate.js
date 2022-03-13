module.exports = {
	name:"interactionCreate",
	run(client, interaction) {

		const command = client.commands.get(interaction.commandName);
		command.run(client, interaction)
	}
}