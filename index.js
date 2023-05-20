require('dotenv').config();
const connectToMongo = require("./db");
const express = require("express");
const cors = require("cors");

// Import route handlers
const userSongsRoute = require("./route/usersongs");
const userInfoRoute = require("./route/userinfo");
const userNameRoute = require("./route/username");
const adminRoute = require("./route/admin");

connectToMongo();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Set up routes
app.use("/api/usersongs", userSongsRoute);
app.use("/api/userinfo", userInfoRoute);
app.use("/api/username", userNameRoute);
app.use("/api/admin", adminRoute);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content- Type, Accept");
  next();
  });

app.get("/", (req, res) => {
  res.send("Welcome to TuneHub Backend!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
