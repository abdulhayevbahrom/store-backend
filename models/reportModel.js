const { Schema, model } = require("mongoose");

const schema = new Schema({
  day: { type: String, default: new Date().toLocaleString() },
  totalProductLenth: { type: Number, default: 0 },
  productPerWeek: { type: Number, default: 0 },
  todaysAmount: { type: Number, default: 0 },
  productPerDay: { type: Number, default: 0 },
});

const ReportDB = model("ReportDB", schema);

module.exports = ReportDB;
