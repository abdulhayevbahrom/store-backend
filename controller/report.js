const productDB = require("../models/productModel");
const ReportDB = require("../models/reportModel");

const getReport = async (req, res) => {
  try {
    let allReport = await ReportDB.find();
    if (!allReport.length) {
      return res.status(404).json({
        status: "warning",
        msg: "No allReport found",
        innerData: allReport,
      });
    }
    res.status(200).json({
      status: "success",
      msg: "Reports are found",
      innerData: allReport,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      msg: "internal server error",
      innerData: null,
    });
  }
};

const createReport = async (req, res) => {
  try {
    let allPro = await productDB.find();
    if (!allPro.length) {
      return res.status(404).json({
        status: "warning",
        msg: "No allReport found",
        innerData: allPro,
      });
    }

    // let totalLength = allPro?.length;
    // let today = new Date().toLocaleString()
    // let todaysPro = allPro.filter(i=>i.day === today)?.length

    // let productPerDay =
  } catch (err) {
    res?.status(500).json({
      status: "error",
      msg: "internal server error",
      innerData: null,
    });
  }
};

setInterval(() => {
  createReport();
}, 3000);

module.exports = { getReport };
