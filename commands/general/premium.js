const keySchema = require("../../structure/PremiumKey.js");
const userSchema = require("../../structure/User.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "premium",
	description: "Manage premium.",
	options: [
		{
			name: "activate",
			description: "Activate premium with a key.",
			type: "SUB_COMMAND",
			options: [
				{
					name: "code",
					description: "The premium key.",
					type: "STRING",
					required: true,
				}
			]
		},
		{
			name: "status",
			description: "Display the status of your premium.",
			type: "SUB_COMMAND"
		}
	],
	botPermissions: [],
	userPermissions: [],
	ownerOnly: false,
	premiumOnly: false,
	async run(client, interaction) {



		await interaction.deferReply();

		const user = await userSchema.findOne({ id: interaction.member.id });
		const subCommand = interaction.options.getSubcommand();


		if (subCommand === "activate") {



			const key = await keySchema.findOne({ key: interaction.options.getString("code") });

			if (!key) {
				return interaction.editReply({ content: "The key is invalid!", ephemeral: true });
			}


			const isPremium = await user.isPremium();

			switch (key.plan) {
				case "day":
					var time = 86400;
					break;
				case "week":
					time = 86400 * 7;
					break;
				case "month":
					time = 86400 * 30;
					break;
				case "year":
					time = 86400 * 365;
					break;
			}


			// const expiresAt = user.premium.expiresAt
			const date = Math.floor(Date.now() / 1000);
			user.premium.active = true;
			user.premium.expiresAt = isPremium ? user.premium.expiresAt + time : date + time;
			user.premium.redeemedAt = isPremium ? user.premium.redeemedAt : date;


			await user.save();
			await key.delete();

			const embed = new MessageEmbed()
				.setColor(process.env.EMBED_COLOR)
				.setTitle("Premium")
				.setDescription("Adding 1 " + key.plan + " of premium successfully!\n" +
					"your premium now expires <t:" + user.premium.expiresAt + ":R> ");

			interaction.editReply({ embeds: [embed] });



		} else if (subCommand === "status") {


			const isPremium = await user.isPremium();

			if (isPremium) {
				const embed = new MessageEmbed()
					.setColor(process.env.EMBED_COLOR)
					.setTitle("Premium status")
					.addFields(
						{ name: "Activate", value: "yes" },
						{ name: "Redeemed at", value: "<t:" + user.premium.redeemedAt + ":D>" },
						{ name: "Expire at", value: "<t:" + user.premium.expiresAt + ":D>" }
					);


				interaction.editReply({ embeds: [embed] });
			} else {

				const embed = new MessageEmbed()
					.setColor(process.env.EMBED_COLOR)
					.setTitle("Premium status")
					.addFields(
						{ name: "Activate", value: "no" },
						{ name: "Redeemed at", value: "-" },
						{ name: "Expire at", value: "-" }
					);
				interaction.editReply({ embeds: [embed] });
			}


		}



	}
};