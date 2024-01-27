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
} = require("../controller/productControl");
const pro = Router();

pro.get("/allProducts", getData);

pro.post("/create", [productValidation.add], createData);

pro.put("/update/:id", updateData);

pro.delete("/delete/:id", deleteData);

pro.get("/single/:id", getSingle);

pro.post("/search", search);

pro.post("/category", category);

module.exports = pro;
