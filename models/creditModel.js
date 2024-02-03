const {model, Schema} = require("mongoose")

const creditModel = new Schema({
    firstname: {type: String},
    lastname: {type: String},
    address: {type: String},
    phone: {type: Number},
    passport: {type: String},
    addedTime: { type: String, default: new Date().toLocaleString() },
    stories: [
        {
          boughtTime: { type: String, default: new Date().toLocaleString() },
          totalPrice: { type: Number, default: 0 },
          subTotal: {type: Number},
          products: [
            {
              title: {
                type: String,
              },
              price: {
                type: Number,
              },
              barcode: {
                type: String,
              },
              brand: {
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
              quantity: {
                type: Number,
                default: 1,
              },
              size: {
                type: String,
              },
              totalPrice: {
                type: Number,
              }
            },
          ],
        },
      ],
});

const userDB = model("creditUsers", creditModel);
module.exports = {userDB}