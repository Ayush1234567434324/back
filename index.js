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

app.get("/", (req, res) => {
  res.send("Welcome to TuneHub Backend!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
