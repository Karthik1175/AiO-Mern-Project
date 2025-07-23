const express = require('express');
const auth = require('../middleware/authMiddleware');
const Todo = require('../models/Todo');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Error fetching todos" });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { text } = req.body;
    if(!text) return res.status(400).json({ message: "Text is required" });
    const todo = new Todo({ text, user: req.user });
    await todo.save();
    res.status(201).json(todo);
  } catch(err) {
    res.status(500).json({ message: "Error saving todo" });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const { text, completed } = req.body;
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { text, completed },
      { new: true }
    );
    if(!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch(err) {
    res.status(500).json({ message: "Error updating todo" });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user });
    if(!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch(err) {
    res.status(500).json({ message: "Error deleting todo" });
  }
});

module.exports = router;
