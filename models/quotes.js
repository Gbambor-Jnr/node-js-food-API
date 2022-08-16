const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quoteSChema = new Schema(
  {
    author: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("quotes", quoteSChema);
