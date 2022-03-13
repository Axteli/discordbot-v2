const { MessageEmbed } = require("discord.js")

module.exports = {
	name: "ping",
	description: "Display the bot's ping.",
	botPermissions: "",
	userPermissions: [],
	async run(client, interaction) {

		const start = Date.now();

		const firstEmbed = new MessageEmbed()
			.setColor(process.env.EMBED_COLOR)
			.setTitle("Bot ping")
			.setDescription("Calculate bot's ping...")

		await interaction.reply({ embeds: [firstEmbed] })

		const end = Date.now();

		const secondEmbed = new MessageEmbed()
			.setColor(process.env.EMBED_COLOR)
			.setTitle("Pong 🏓")
			.setDescription(`**Api ping** : ${client.ws.ping} ms\n**Bot's ping** : ${end - start} ms`)

		interaction.editReply({ embeds: [secondEmbed] })
	}
}