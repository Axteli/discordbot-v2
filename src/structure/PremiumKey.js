const mongoose = require("mongoose");

const keySchema = new mongoose.Schema({

	key: String,
	plan: String,

});

module.exports = mongoose.model("PremiumKey", keySchema);