const { model, Schema } = require("mongoose");

const schema = new Schema({
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
});

const productDB = model("products", schema);

module.exports = productDB;
