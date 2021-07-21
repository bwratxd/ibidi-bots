const { Schema, model } = require("mongoose");

const schema = Schema({
  rank: { type: Array, default: [] }
});

module.exports = model("ranks", schema);
