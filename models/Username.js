const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsernameSchema = new Schema({
  Username: {
    type: String,
    unique: true,
  },
});

const Username = mongoose.model("Username", UsernameSchema);

module.exports = Username;
