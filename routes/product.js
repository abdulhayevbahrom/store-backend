const { Router } = require("express");
const productValidation = require("../validation/productValidation");
const {
  createData,
  deleteData,
  getData,
  getSingle,
  updateData,
  search,
  category,
  scan,
} = require("../controller/productControl");
const pro = Router();

pro.get("/allProducts", getData);

pro.post("/create", createData);

pro.put("/update/:id", updateData);

pro.delete("/delete/:id", deleteData);

pro.get("/single/:id", getSingle);

pro.post("/search", search);

pro.post("/category", category);

pro.post("/scan", scan);

module.exports = pro;
