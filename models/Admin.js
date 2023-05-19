const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  artwork: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  id: {
    type: String,
    required: true,
    unique: true
  },
  likes: {
    type: [String],
    default: []
  },
  adds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: []
  }
});

const popSchema = new mongoose.Schema({

  songs: [songSchema]
});

const lofiSchema = new mongoose.Schema({

  songs: [songSchema]
});

const romanticSchema = new mongoose.Schema({

  songs: [songSchema]
});

const bhaktiSchema = new mongoose.Schema({

  songs: [songSchema]
});

const animeSchema = new mongoose.Schema({
 
  songs: [songSchema]
});

const Pop = mongoose.model('Pop', popSchema);
const Lofi = mongoose.model('Lofi', lofiSchema);
const Romantic = mongoose.model('Romantic', romanticSchema);
const Bhakti = mongoose.model('Bhakti', bhaktiSchema);
const Anime = mongoose.model('Anime', animeSchema);

module.exports = {
  Pop,
  Lofi,
  Romantic,
  Bhakti,
  Anime
};
