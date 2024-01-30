const {model, Schema} = require("mongoose")

const creditModel = new Schema({
    firstname: {type: String},
    lastname: {type: String},
    address: {type: String},
    phone: {type: Number},
    passport: {type: String},
    addedTime: { type: String, default: new Date().toLocaleString() },
});

const userDB = model("creditUsers", creditModel);
module.exports = {userDB}