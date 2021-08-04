const { Schema, model } = require("mongoose");

const schema = new Schema({
    id: String,
    members: Array,
    channelOverwrites: Array,
});

module.exports = model("BACKUP", schema);
