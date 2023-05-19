const express = require("express");
const router = express.Router();
const axios = require('axios');

const { Pop, Lofi, Romantic, Bhakti, Anime } = require("../models/Admin");




const cors = require('cors');
router.use(cors());



router.post('/pop', async (req, res) => {
  try {
    const { title, artist, artwork, url, id } = req.body;
    const song = { title, artist, artwork, url, id };
    const playlist = await Pop.findOneAndUpdate(
      {},
      { $push: { songs: song } },
      { upsert: true }
    );
    return res.status(201).json({ message: 'Song added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
router.post('/pop/dualcheck-like', async (req, res) => {
  try {
    const { songId, userId } = req.body;
    const playlist = await Pop.findOne({
      'songs.id': songId
    });
    console.log(playlist)
    if (!playlist) {
      return res.status(404).json({ message: '0' });
    }
    const song = playlist.songs.find(song => song.id === songId);
    if (!song) {
      return res.status(404).json({ message: '0' });
    }
    if (!song.likes || !song.likes.includes(userId)) {
      return res.status(404).json({ message: '0' });
    }
    return res.status(200).json({ message: '1' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '0' });
  }
});

router.post('/pop/check-like', async (req, res) => {
  try {
    const { songId, userId } = req.body;
    const playlist = await Pop.findOne({
      'songs.id': songId
    });
    if (!playlist) {
      return res.status(404).json({ message: 'Song not found' });
    }
    const liked = playlist.songs.some(song => song.id === songId && song.likes.includes(userId));
    if (liked) {
      // Remove like
      const updatedPlaylist = await Pop.updateOne(
        { 'songs.id': songId },
        { $pull: { 'songs.$.likes': userId } }
      );
      return res.status(200).json({ message: 'Like removed' });
    } else {
      // Add like
      const updatedPlaylist = await Pop.updateOne(
        { 'songs.id': songId },
        { $addToSet: { 'songs.$[elem].likes': userId } },
        { arrayFilters: [{ 'elem.id': songId }] }
      );
      return res.status(200).json({ message: 'Like added' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/pop/playlists', async (req, res) => {
  try {
    const pop = await Pop.findOne();
    return res.json(pop.songs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/lofi', async (req, res) => {
  try {
    const { title, artist, artwork, url, id } = req.body;
    const song = { title, artist, artwork, url, id };
    const playlist = await Lofi.findOneAndUpdate(
      {},
      { $push: { songs: song } },
      { upsert: true }
    );
    return res.status(201).json({ message: 'Song added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
router.post('/lofi/dualcheck-like', async (req, res) => {
  try {
    const { songId, userId } = req.body;
    const playlist = await Lofi.findOne({
      'songs.id': songId
    });
    console.log(playlist)
    if (!playlist) {
      return res.status(404).json({ message: '0' });
    }
    const song = playlist.songs.find(song => song.id === songId);
    if (!song) {
      return res.status(404).json({ message: '0' });
    }
    if (!song.likes || !song.likes.includes(userId)) {
      return res.status(404).json({ message: '0' });
    }
    return res.status(200).json({ message: '1' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '0' });
  }
});

router.post('/lofi/check-like', async (req, res) => {
  try {
    const { songId, userId } = req.body;
    const playlist = await Lofi.findOne({
      'songs.id': songId
    });
    if (!playlist) {
      return res.status(404).json({ message: 'Song not found' });
    }
    const liked = playlist.songs.some(song => song.id === songId && song.likes.includes(userId));
    if (liked) {
      // Remove like
      const updatedPlaylist = await Lofi.updateOne(
        { 'songs.id': songId },
        { $pull: { 'songs.$.likes': userId } }
      );
      return res.status(200).json({ message: 'Like removed' });
    } else {
      // Add like
      const updatedPlaylist = await Lofi.updateOne(
        { 'songs.id': songId },
        { $addToSet: { 'songs.$[elem].likes': userId } },
        { arrayFilters: [{ 'elem.id': songId }] }
      );
      return res.status(200).json({ message: 'Like added' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/lofi/playlists', async (req, res) => {
  try {
    const lofi = await Lofi.findOne();
    return res.json(lofi.songs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/romantic', async (req, res) => {
  try {
    const { title, artist, artwork, url, id } = req.body;
    const song = { title, artist, artwork, url, id };
    const playlist = await Romantic.findOneAndUpdate(
      {},
      { $push: { songs: song } },
      { upsert: true }
    );
    return res.status(201).json({ message: 'Song added successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
router.post('/romantic/dualcheck-like', async (req, res) => {
  try {
    const { songId, userId } = req.body;
    const playlist = await Romantic.findOne({
      'songs.id': songId
    });
    console.log(playlist)
    if (!playlist) {
      return res.status(404).json({ message: '0' });
    }
    const song = playlist.songs.find(song => song.id === songId);
    if (!song) {
      return res.status(404).json({ message: '0' });
    }
    if (!song.likes || !song.likes.includes(userId)) {
      return res.status(404).json({ message: '0' });
    }
    return res.status(200).json({ message: '1' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '0' });
  }
});

router.post('/romantic/check-like', async (req, res) => {
  try {
    const { songId, userId } = req.body;
    const playlist = await Romantic.findOne({
      'songs.id': songId
    });
    if (!playlist) {
      return res.status(404).json({ message: 'Song not found' });
    }
    const liked = playlist.songs.some(song => song.id === songId && song.likes.includes(userId));
    if (liked) {
      // Remove like
      const updatedPlaylist = await Romantic.updateOne(
        { 'songs.id': songId },
        { $pull: { 'songs.$.likes': userId } }
      );
      return res.status(200).json({ message: 'Like removed' });
    } else {
      // Add like
      const updatedPlaylist = await Romantic.updateOne(
        { 'songs.id': songId },
        { $addToSet: { 'songs.$[elem].likes': userId } },
        { arrayFilters: [{ 'elem.id': songId }] }
      );
      return res.status(200).json({ message: 'Like added' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/romantic/playlists', async (req, res) => {
  
  try {
    const romantic = await Romantic.findOne();
    return res.json(romantic.songs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
















router.post('/Bhakti', async (req, res) => {
    try {
      const { title, artist, artwork, url, id } = req.body;
      const song = { title, artist, artwork, url, id };
      const playlist = await Bhakti.findOneAndUpdate(
        {},
        { $push: { songs: song } },
        { upsert: true }
      );
      return res.status(201).json({ message: 'Song added successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.post('/Bhakti/dualcheck-like', async (req, res) => {
    try {
      const { songId, userId } = req.body;
      const playlist = await Bhakti.findOne({
        'songs.id': songId
      });
      console.log(playlist)
      if (!playlist) {
        return res.status(404).json({ message: '0' });
      }
      const song = playlist.songs.find(song => song.id === songId);
      if (!song) {
        return res.status(404).json({ message: '0' });
      }
      if (!song.likes || !song.likes.includes(userId)) {
        return res.status(404).json({ message: '0' });
      }
      return res.status(200).json({ message: '1' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: '0' });
    }
  });
  
  router.post('/Bhakti/check-like', async (req, res) => {
    try {
      const { songId, userId } = req.body;
      const playlist = await Bhakti.findOne({
        'songs.id': songId
      });
      if (!playlist) {
        return res.status(404).json({ message: 'Song not found' });
      }
      const liked = playlist.songs.some(song => song.id === songId && song.likes.includes(userId));
      if (liked) {
        // Remove like
        const updatedPlaylist = await Bhakti.updateOne(
          { 'songs.id': songId },
          { $pull: { 'songs.$.likes': userId } }
        );
        return res.status(200).json({ message: 'Like removed' });
      } else {
        // Add like
        const updatedPlaylist = await Bhakti.updateOne(
          { 'songs.id': songId },
          { $addToSet: { 'songs.$[elem].likes': userId } },
          { arrayFilters: [{ 'elem.id': songId }] }
        );
        return res.status(200).json({ message: 'Like added' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  router.get('/Bhakti/playlists', async (req, res) => {
    try {
      const romantic = await Bhakti.findOne();
      return res.json(romantic.songs);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.post('/anime', async (req, res) => {
    try {
      const { title, artist, artwork, url, id } = req.body;
      const song = { title, artist, artwork, url, id };
      const playlist = await Anime.findOneAndUpdate(
        {},
        { $push: { songs: song } },
        { upsert: true }
      );
      return res.status(201).json({ message: 'Song added successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  router.post('/anime/dualcheck-like', async (req, res) => {
    try {
      const { songId, userId } = req.body;
      const playlist = await Anime.findOne({
        'songs.id': songId
      });
      console.log(playlist)
      if (!playlist) {
        return res.status(404).json({ message: '0' });
      }
      const song = playlist.songs.find(song => song.id === songId);
      if (!song) {
        return res.status(404).json({ message: '0' });
      }
      if (!song.likes || !song.likes.includes(userId)) {
        return res.status(404).json({ message: '0' });
      }
      return res.status(200).json({ message: '1' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: '0' });
    }
  });
  
  router.post('/anime/check-like', async (req, res) => {
    try {
      const { songId, userId } = req.body;
      const playlist = await Anime.findOne({
        'songs.id': songId
      });
      if (!playlist) {
        return res.status(404).json({ message: 'Song not found' });
      }
      const liked = playlist.songs.some(song => song.id === songId && song.likes.includes(userId));
      if (liked) {
        // Remove like
        const updatedPlaylist = await Anime.updateOne(
          { 'songs.id': songId },
          { $pull: { 'songs.$.likes': userId } }
        );
        return res.status(200).json({ message: 'Like removed' });
      } else {
        // Add like
        const updatedPlaylist = await Anime.updateOne(
          { 'songs.id': songId },
          { $addToSet: { 'songs.$[elem].likes': userId } },
          { arrayFilters: [{ 'elem.id': songId }] }
        );
        return res.status(200).json({ message: 'Like added' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  router.get('/anime/playlists', async (req, res) => {
    try {
      const romantic = await Anime.findOne();
      return res.json(romantic.songs);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
 










module.exports = router;
