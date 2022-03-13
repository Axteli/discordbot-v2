const { readdirSync } = require("fs");

async function loadCommands(client) {


    //set the commands discord collection
    client.categories.forEach(category => {

        readdirSync(`./commands/${category}`).forEach(commandFile => {

            const command = require(`../commands/${category}/${commandFile}`)
            client.commands.set(command.name, command)

        })

    })
    //set slash commands on the support server
    client.guilds.fetch(process.env.SUPPORT_SERVER).then(guild => {

        if (guild) {

            client.log.info("command", `The support server is: ${guild.name}. Starting refreshing slash commands...`)
            guild.commands.set(client.commands.map(cmd => cmd)).then(
                client.log.info("command", `Slash commands set on ${guild.name}!`)
            )

        } else {

            client.log.error("command", "Unable to find support server. Slash commands can't load correctly!")

        }


    })
}
module.exports = {
    loadCommands
}