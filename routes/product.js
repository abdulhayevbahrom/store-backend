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
  deleteAllData,
  updateManyData,
} = require("../controller/productControl");
const pro = Router();

pro.get("/allProducts", getData);

pro.post("/create", [productValidation.add], createData);

pro.put("/update/:id", updateData);

pro.delete("/delete/:id", deleteData);

pro.delete("/deleteAllData", deleteAllData);

pro.get("/single/:id", getSingle);

pro.post("/search", search);

pro.post("/category", category);

pro.post("/scan", scan);

pro.patch("/updateQty", updateManyData);

module.exports = pro;
