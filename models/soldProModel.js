const { model, Schema } = require("mongoose");

const schema = new Schema({
  //   history: {
  //     type: Array,
  //   },
  title: {
    type: String,
  },
  orgPrice: {
    type: Number,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  size: {
    type: String,
  },
  category: {
    type: String,
  },
  color: {
    type: String,
  },
  subcategory: {
    type: String,
  },
  brand: {
    type: String,
  },
  barcode: {
    type: String,
  },
  totalPrice: {
    type: Number,
  },
  addedTime: {
    type: String,
    default: new Date().toLocaleString(),
  },
});

const soldProductDB = model("soldProducts", schema);

module.exports = soldProductDB;
