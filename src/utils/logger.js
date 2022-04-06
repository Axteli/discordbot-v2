const chalk = require("chalk");
const moment = require("moment");


const sourceColor = {

	command: "cyan",
	event: "green",
	main: "white",
	button: "magenta",
	selectMenu: "blue"

};

function logger(color, source, level, content) {

	const date = moment(Date.now()).format("DD/MM - HH:mm:ss:SS");
	const Color = sourceColor[source];

	if(!chalk[Color]) {

		console.log(chalk.grey(`[${date}] `) + "[main/WARN]" + " " + chalk.yellow(`The function client.log.${level} was called with the source ${source}, but it dosen't exist!`));
		return;

	}

	console.log(chalk.grey(`[${date}] `) + chalk[Color](`[${source}/${level}]`) + " " + chalk[color](content));

}

module.exports = class log {

	static info(source, content) {
		return logger("white", source, "INFO", content);
	}

	static warn(source, content) {
		return logger("yellow", source, "WARN", content);
	}

	static error(source, content) {
		return logger("red", source, "ERROR", content);
	}

};