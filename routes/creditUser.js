const { Router } = require("express");
const creditUser = Router();
const {creditValidation } = require ("../validation/creditValidation")

const {
  getCreditData,
  createCreditUser,
} = require("../controller/creditControl");

creditUser.get("/creditUsers", getCreditData);

creditUser.post("/create", [creditValidation], createCreditUser);

module.exports = { creditUser };
