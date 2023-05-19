const connectTomongo = require("./db");
const express = require("express");

const cors = require("cors");
connectTomongo();

const app = express();
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 
  next();
});


app.use(cors());
const port = process.env.PORT||3000;
app.use(express.json());

app.use("/api/usersongs", require("./route/usersongs"));
app.use("/api/userinfo", require("./route/userinfo"));
app.use("/api/username", require("./route/username"));
app.use("/api/admin", require("./route/admin"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
