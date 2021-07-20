const mongoose = require("mongoose");

const bannedtag = new mongoose.Schema({
    guildID: String,
    BannedTag: String
});

module.exports = mongoose.model("BannedTags", bannedtag);