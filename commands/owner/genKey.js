const schema = require("../../structure/PremiumKey.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "genkey",
	description: "Generate premium key for the bot.",
	options: [
		{
			name: "plan",
			description: "The duration when the code(s) is(are) valid.",
			type: "STRING",
			required: true,
			choices: [
				{
					name: "day",
					value: "day",
				},
				{
					name: "week",
					value: "week",
				},
				{
					name: "month",
					value: "month",
				},
				{
					name: "year",
					value: "year",
				}
			]
		},
		{
			name: "amount",
			description: "The amount of code(s) will be generated.",
			type: "NUMBER",
			required: false
		}
	],
	botPermissions: [],
	userPermissions: [],
	ownerOnly: true,
	premiumOnly: false,
	async run(client, interaction) {


		await interaction.deferReply({ ephemeral: true });

		const option = interaction.options.getNumber("amount");
		const amount = option > 200 ? 200 : option || 1;
		var keys = [];
		const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";


		for (let i = 0; i <= amount; i++) {


			let key = "";
			let format = "####-####-####-####";

			format.split("").map(function (char) {

				if (char === "#") {
					key += characters.charAt(Math.floor(Math.random() * characters.length));

				} else if (char === "-") {
					key += "-";
				}

			});

			keys.push(key);


			const find = await schema.findOne({ key: key });
			if (!find) {
				schema.create({
					key: key,
					plan: interaction.options.getString("plan")
				});
			}


		}

		const embed = new MessageEmbed()
			.setColor(process.env.EMBED_COLOR)
			.setTitle("Code generated:")
			.setDescription("```" + keys.join("\n") + "```")
			.addField("Plan", interaction.options.getString("plan"));

		interaction.editReply({ embeds: [embed], ephemeral: true });



	}
};