const { getReport } = require("../controller/report");

const report = require("express").Router();

report.get("/allReports", getReport);

module.exports = report;
