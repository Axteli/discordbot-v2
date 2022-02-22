const eventClient = (event) => require(`../events/client/${event}`);

function loadEvents(client) {

    //client event
    client.on("ready", () => eventClient("ready.js")(client));

}
module.exports = {
    loadEvents
};