const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
	name: "ping",
	description: "Display the bot's ping.",
	botPermissions: [],
	userPermissions: [],
	ownerOnly: false,
	premiumOnly: false,
	async run(client, interaction) {


		const start = Date.now();

		await interaction.deferReply();

		const end = Date.now();


		const embed = new MessageEmbed()
			.setColor(process.env.EMBED_COLOR)
			.setTitle("Pong 🏓")
			.setDescription(`**Api ping** : ${client.ws.ping} ms\n**Bot's ping** : ${end - start} ms`);


		const buttons = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setStyle("SUCCESS")
					.setCustomId("ping/refresh")
					.setLabel("Refresh")
			);


		interaction.editReply({ embeds: [embed], components: [buttons] })
		interaction.reply("yo")
	}
};