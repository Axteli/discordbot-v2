const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({


	id: { type: String },

	premium: {

		active: { type: Number, default: false },
		redeemedAt: { type: Number, default: null },
		expiresAt: { type: Number, default: null },

	},


});

userSchema.methods.isPremium = async function () {

	if (this.premium.active) {

		if (this.premium.expiresAt > Date.now() / 1000) {
			return true;
		} else {

			this.premium.active = false;
			this.premium.expiresAt = null;
			this.premium.redeemedAt = null;
			await this.save();
			return false;

		}

	} else {
		return false;
	}

};

module.exports = mongoose.model("User", userSchema);