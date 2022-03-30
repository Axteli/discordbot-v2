module.exports = {
	name: "interactionCreate",
	run(client, interaction) {


		if (interaction.isCommand()) {



			const command = client.commands.get(interaction.commandName);


			//check if the command is restricted to owner
			if (command.ownerOnly) {
				if (process.env.OWNER_ID !== interaction.member.id) {
					return interaction.reply({ content: "You can't exeucte this command because you are not the owner of the bot!", ephemeral: true });
				}
			};


			//check bot permissions
			if (!interaction.guild.me.permissions.has(command.botPermissions || [])) {
				const missingPermissions = command.botPermissions.filter(permission => !interaction.guild.me.permissions.toArray().includes(permission));
				return interaction.reply({ content: "I need permissions : " + missingPermissions, ephemeral: true });
			};


			//check user permissions
			if (!interaction.memberPermissions.has(command.userPermissions || [])) {
				const missingPermissions = command.userPermissions.filter(permission => !interaction.memberPermissions.toArray().includes(permission));
				return interaction.reply({ content: "You need permissions : " + missingPermissions, ephemeral: true });
			};

			//if all conditions are met, run the command
			command.run(client, interaction);



		} else if (interaction.isButton()) {

			const button = client.buttons.get(interaction.customId);
			button.run(client, interaction);

		};


	}
};