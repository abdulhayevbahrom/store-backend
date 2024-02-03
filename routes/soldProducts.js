const { Router } = require("express");
const { soldProValidation } = require("../validation/soldProValidation");
const { createData, getData } = require("../controller/soldProControl");

const soldPro = Router();

soldPro.get("/allProducts", getData);

soldPro.post("/create", createData);

// soldPro.put("/update/:id", updateData);

// soldPro.delete("/delete/:id", deleteData);

// soldPro.delete("/deleteAllData", deleteAllData);

module.exports = soldPro;
