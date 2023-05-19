const mongoose = require("mongoose");
const mongoUrl =
  "mongodb+srv://tunehub052:pm3qH5ZdsWaP3GN6@cluster0.m9teyjj.mongodb.net/?retryWrites=true&w=majority";
const connectTomongo = () => {
  mongoose.connect(mongoUrl, () => {
    console.log("oh uh open it up");
  });
};

module.exports = connectTomongo;
mongoose.set("strictQuery", false);

