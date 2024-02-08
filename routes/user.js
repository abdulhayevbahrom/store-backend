const { Router } = require("express");
const { userDB } = require("../models/userModel");
const userValidation = require("../validation/userValidation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const user = Router();

// allUser
user.get("/allUser", async (req, res) => {
  let allUser = await userDB.find();
  if (!allUser.length) {
    return res
      .status(404)
      .json({ success: false, msg: "No user found", innerData: allUser });
  }
  res
    .status(200)
    .json({ success: true, msg: "user found", innerData: allUser });
});

// user is create
user.post("/create", [userValidation.add], async (req, res) => {
  try {
    let user = req.body;
    let exactUser = await userDB.findOne({ username: user.username });

    if (exactUser) {
      return res.status(400).json({
        success: false,
        msg: `${user.username} is already registered`,
        innerData: null,
      });
    }

    let hashPassword = await bcrypt.hash(user.password, 10);
    user.password = hashPassword;

    let newUser = await userDB.create(user);
    let savedUser = await newUser.save();

    res
      .status(201)
      .json({ success: true, msg: "user created", innerData: savedUser });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, msg: "Internal Server Error", innerData: null });
  }
});

// user login
user.post("/login", async (req, res) => {
  let { username, password } = req.body;
  let exactUser = await userDB.findOne({ username });

  if (!exactUser) {
    return res
      .status(403)
      .json({ success: false, msg: "username or password incorrect" });
  }

  let checkpassword = await bcrypt.compare(password, exactUser.password);

  if (!checkpassword) {
    return res
      .status(403)
      .json({ success: false, msg: "username or password incorrect" });
  }

  let token = await jwt.sign({ exactUser }, process.env.JWT_SECRET_KEY);

  res.status(202).json({
    success: true,
    msg: "successfully sign in",
    innnerdata: { user: exactUser, token },
  });
});

module.exports = user;
