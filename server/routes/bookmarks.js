const express = require('express');
const auth = require('../middleware/authMiddleware');
const Bookmark = require('../models/Bookmark');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.user });
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookmarks" });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { title, url } = req.body;
    if(!title || !url) return res.status(400).json({ message: "Title and URL are required" });
    const bookmark = new Bookmark({ title, url, user: req.user });
    await bookmark.save();
    res.status(201).json(bookmark);
  } catch(err) {
    res.status(500).json({ message: "Error saving bookmark" });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { title, url } = req.body;
    const bookmark = await Bookmark.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { title, url },
      { new: true }
    );
    if(!bookmark) return res.status(404).json({ message: "Bookmark not found" });
    res.json(bookmark);
  } catch(err) {
    res.status(500).json({ message: "Error updating bookmark" });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({ _id: req.params.id, user: req.user });
    if(!bookmark) return res.status(404).json({ message: "Bookmark not found" });
    res.json({ message: "Bookmark deleted" });
  } catch(err) {
    res.status(500).json({ message: "Error deleting bookmark" });
  }
});

module.exports = router;
