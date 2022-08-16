const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const checkoutSchema = new Schema({
  //   name: { type: String, required: true },
  //   city: { type: String, required: true },
  //   post: { type: Number, required: true },
  //   name: { type: String, required: true },
  user: {
    type: Object,
    required: true,
  },
  items: { type: Object, required: true },
});

module.exports = mongoose.model("Checkout", checkoutSchema);
