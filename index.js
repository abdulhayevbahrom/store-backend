const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
require("dotenv").config();
require("colors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// CONNECTING TO DATABASE

connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to Database".bgGreen))
  .catch(() => console.log("Not connected to Database".bgGreen));

app.get("/", (req, res) => {
  res.send("App is running");
});

// END-POINTS
const pro = require("./routes/product");
const { creditUser } = require("./routes/creditUser");

app.use("/pro", pro);
app.use("/creditUser", creditUser);

// LISTENING DIRECTORY
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`.bgCyan));
