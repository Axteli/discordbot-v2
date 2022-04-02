const { grey } = require("chalk");
const moment = require("moment");
var spawn = require("child_process").spawn;


console.clear();
start();


async function start() {


	console.log("DiscordBot v2 - Made by Axteli - Github Repo: https://github.com/Axteli/discordbot-v2 - Licence : GPL-V3\n\n");
	const date = moment(Date.now()).format("DD/MM - HH:mm:ss:SS");
	console.log(grey(`[${date}] `) + "[child/INFO] launching child process...");


	const proc = spawn("node", ["./index.js"], { stdio: "inherit" });


	proc.on("exit", function (code) {

		console.log("Process has exited. Code: " + code);
		switch (code) {

			case 14:
				console.log("This is an intentional stop.");
				break;

			case 15:
				console.log("This is an intentional restart.");
				console.log("Restarting process in 5 sec...");
				setTimeout(start, 5000);
				break;

			default:
				console.log("Restarting process in 5 sec...");
				setTimeout(start, 5000);

		}

	});


}