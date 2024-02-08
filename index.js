const express = require("express");
const cors = require("cors");
const { connect } = require("mongoose");
require("dotenv").config();
require("colors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://store-frontend-1232.vercel.app/",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

// CONNECTING TO DATABASE
connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to Database".bgGreen))
  .catch(() => console.log("Not connected to Database".bgRed));

app.get("/", (req, res) => {
  res.send("App is running");
});

// END-POINTS
const pro = require("./routes/product");
const soldPro = require("./routes/soldProducts");
const { creditUser } = require("./routes/creditUser");
const user = require("./routes/user");
const report = require("./routes/report");

app.use("/pro", pro);
app.use("/soldPro", soldPro);
app.use("/creditUser", creditUser);
app.use("/user", user);
app.use("/report", report);

// LISTENING DIRECTORY
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`.bgCyan));
