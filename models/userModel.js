const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstname: { type: String },
  lastname: { type: String },
  age: { type: Number },
  gender: { type: String },
  username: { type: String },
  password: { type: String },
  email: { type: String },
  phone: { type: String },
  address: { type: String },
  role: { type: String, default: "user" },
  addedTime: { type: Number, default: new Date() },
});

const userDB = model("user", userSchema);

module.exports = { userDB };
