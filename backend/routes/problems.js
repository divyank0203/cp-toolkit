const express = require('express');
const Problem = require('../models/Problem');
const User = require('../models/User');
const protect = require('../middleware/auth');

const router = express.Router();

// GET /api/problems
router.get('/', async (req, res) => {
  try {
    const { difficulty, platform, tag, search, page = 1, limit = 20 } = req.query;
    const query = {};
    if (difficulty) query.difficulty = difficulty;
    if (platform) query.platform = platform;
    if (tag) query.tags = { $in: [new RegExp(tag, 'i')] };
    if (search) query.$text = { $search: search };

    const total = await Problem.countDocuments(query);
    const problems = await Problem.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.json({ success: true, count: problems.length, total, data: problems });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/problems/:id/solve  (protected)
router.post('/:id/solve', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const problemId = req.params.id;
    const isSolved = user.solvedProblems.includes(problemId);

    if (isSolved) {
      user.solvedProblems = user.solvedProblems.filter(id => id.toString() !== problemId);
    } else {
      user.solvedProblems.push(problemId);
    }
    await user.save();
    res.json({ success: true, solved: !isSolved });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;