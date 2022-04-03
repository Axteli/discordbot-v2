module.exports = {
	name: "restart",
	description: "Restart the bot.",
	botPermissions: [],
	userPermissions: [],
	ownerOnly: true,
	premiumOnly: false,
	async run(client, interaction) {


		await interaction.reply({ content: "🖤 Restarting the bot... goodbye!", ephemeral: true });
		process.exit(15);


	}
};