const { userDB } = require("../models/creditModel");

const getCreditData = async (req, res) => {
  try {
    let creditUsers = await userDB.find();
    if (!creditUsers.length) {
      return res.status(404).json({
        status: "warning",
        msg: "No creditUsers found",
        innerData: creditUsers,
      });
    }
    res.status(200).json({
      status: "success",
      msg: "CreditUsers are found",
      innerData: creditUsers,
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", msg: "internal server error", innerData: null });
  }
};

// create credit user

const createCreditUser = async (req, res) => {
  try {
    let data = req.body;
    let exactCreditUser = await userDB.findOne({ phone: data.phone });
    if (exactCreditUser) {
      return res.status(200).json({
        status: "success",
        text: "found",
        msg: "creditUser is found",
        innerData: exactCreditUser,
      });
    }

    let newCreditUser = await userDB.create(req.body);
    let save = await newCreditUser.save();
    res.status(201).json({
      status: "success",
      msg: "userCredit is created",
      innerData: save,
    });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", msg: "internal server error", innerData: null });
  }
};

// cridit find user

const criditFindUser = async (req, res) => {
  try {
    let { id } = req.body;
    let criditExactUser = await userDB.findById(id);
    if (!criditExactUser) {
      res
        .status(404)
        .json({ msg: false, status: "warning", innerData: criditExactUser });
    }
    // console.log(criditExactUser);
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", msg: "internal server error", innerData: null });
  }
};

// credit  find register

const creditFindRegister = async (req, res) => {
  try {
    let { phone, passport } = req.body;

    let creditFindUser = await userDB.find({ passport, phone });

    // if (!creditFindUser) {
    //   res
    //     .status(404)
    //     .json({ msg: false, status: "warning", innerData: creditFindUser });
    // }

    console.log(createCreditUser);
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", msg: "internal server error", innerData: null });
  }
};

module.exports = {
  getCreditData,
  createCreditUser,
  criditFindUser,
  creditFindRegister,
};
