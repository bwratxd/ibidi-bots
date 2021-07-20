const mongoose = require("mongoose");

const roll = mongoose.Schema({
  guildID: String,
  kullanıcıID: String,
  rolveridb: { type: Array, default: [] }
});

module.exports = mongoose.model("rolls", roll);