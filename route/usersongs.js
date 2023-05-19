const express = require("express");
const router = express.Router();
const UserModel = require("../models/Usersongs");

const cors = require('cors');
router.use(cors());
router.post('/:Username', async (req, res) => {
    try {
        const { Username } = req.body;
        const newUser = new UserModel({ Username: Username });
        await newUser.save();
        res.status(201).json({ success: true, message: "Username saved" });


      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: "Username not saved" });
      }
  });
  router.post('/:Username/playlists', async (req, res) => {
  try {
    const { Username } = req.params;
    const songData = req.body;
    console.log(Username)
    console.log(songData)
    const user = await UserModel.findOne({ Username: Username });
    console.log(user)
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.playlists.push(songData);
    console.log(songData)
    await user.save();

    res.status(200).json({ success: true, message: 'Song added to playlist' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

  router.get('/:Username/playlists', async (req, res) => {
    try {
      const { Username } = req.params;
  
      const user = await UserModel.findOne({ Username: Username });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      const playlists = user.playlists;
      res.status(200).json({ success: true, data: playlists });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  router.delete('/:Username/playlists/:playlistId', async (req, res) => {
    try {
      const { Username, playlistId } = req.params;
  
      // Find the user
      const user = await UserModel.findOne({ Username }).populate('playlists');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the playlist to be deleted
      const playlist = user.playlists.find(p => p.id === playlistId);
      if (!playlist) {
        return res.status(404).json({ message: 'Playlist not found' });
      }
  
      // Manually delete the playlist
      const index = user.playlists.indexOf(playlist);
      user.playlists.splice(index, 1);
      await user.save();
  
      return res.json({ message: 'Playlist deleted successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  module.exports = router;