const { Router } = require("express");
const creditUser = Router();
const { creditValidation } = require("../validation/creditValidation");

const {
  getCreditData,
  createCreditUser,
  criditFindUser,
} = require("../controller/creditControl");

creditUser.get("/creditUsers", getCreditData);

creditUser.post("/create", [creditValidation], createCreditUser);

creditUser.post("/criditFindUser/:id", criditFindUser);

module.exports = { creditUser };
