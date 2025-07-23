const express = require('express');
const auth = require('../middleware/authMiddleware');
const Habit = require('../models/Habit');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const habits = await Habit.find({ user: req.user });
    res.json(habits);
  } catch (err) {
    res.status(500).json({ message: "Error fetching habits" });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { name, streak } = req.body;
    if(!name) return res.status(400).json({ message: "Name is required" });
    const habit = new Habit({ name, streak: streak || 0, user: req.user });
    await habit.save();
    res.status(201).json(habit);
  } catch(err) {
    res.status(500).json({ message: "Error saving habit" });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { name, streak } = req.body;
    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { name, streak },
      { new: true }
    );
    if(!habit) return res.status(404).json({ message: "Habit not found" });
    res.json(habit);
  } catch(err) {
    res.status(500).json({ message: "Error updating habit" });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({ _id: req.params.id, user: req.user });
    if(!habit) return res.status(404).json({ message: "Habit not found" });
    res.json({ message: "Habit deleted" });
  } catch(err) {
    res.status(500).json({ message: "Error deleting habit" });
  }
});

module.exports = router;
