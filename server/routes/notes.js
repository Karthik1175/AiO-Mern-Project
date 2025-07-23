const express = require('express');
const auth = require('../middleware/authMiddleware');
const Note = require('../models/Note');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes" });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { content } = req.body;
    if(!content) return res.status(400).json({ message: "Content is required" });
    const note = new Note({ content, user: req.user });
    await note.save();
    res.status(201).json(note);
  } catch(err) {
    res.status(500).json({ message: "Error saving note" });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { content } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { content },
      { new: true }
    );
    if(!note) return res.status(404).json({ message: "Note not found" });
    res.json(note);
  } catch(err) {
    res.status(500).json({ message: "Error updating note" });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user });
    if(!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch(err) {
    res.status(500).json({ message: "Error deleting note" });
  }
});

module.exports = router;
