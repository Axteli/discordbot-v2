const { MessageEmbed } = require("discord.js");
module.exports = {
	name: "ping/refresh",
	async run(client, interaction) {


		const start = Date.now();

		await interaction.deferReply({ ephemeral: true });

		const end = Date.now();


		const embed = new MessageEmbed()
			.setColor(process.env.EMBED_COLOR)
			.setTitle("Pong 🏓")
			.setDescription(`**Api's ping** : ${client.ws.ping} ms\n**Bot's ping** : ${end - start} ms`);


		interaction.editReply({ embeds: [embed] });


	}
};