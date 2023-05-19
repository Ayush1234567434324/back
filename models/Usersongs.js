const mongoose = require("mongoose");



const useSchema = new mongoose.Schema({
  Username: {
    type: String
  },
  playlists: {
    type: [{
      title: {
        type: String
      },
      artist: {
        type: String
      },
      artwork: {
        type: String
      },
      url: {
        type: String
      },
      id: {
        type: String
      }
    }],
    default: []
  }
});


const Usersongs = mongoose.model("Usersongs", useSchema);

module.exports = Usersongs;
