const { Router } = require("express");
const creditUser = Router();
const { creditValidation } = require("../validation/creditValidation");

const {
  getCreditData,
  createCreditUser,
  criditFindUser,
  creditFindRegister,
  createDeleteOneUser,
} = require("../controller/creditControl");

creditUser.get("/creditUsers", getCreditData);

creditUser.post("/create", [creditValidation], createCreditUser);

creditUser.post("/creditFindUser/:id", criditFindUser);

creditUser.delete("/creditDeleteOneUser/:id", createDeleteOneUser);

creditUser.post("/creditFindRegister", creditFindRegister);

module.exports = { creditUser };
