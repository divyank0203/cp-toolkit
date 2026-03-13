const express = require('express');
const Algorithm = require('../models/Algorithm');
const User = require('../models/User');
const protect = require('../middleware/auth');

const router = express.Router();

// GET /api/algorithms
router.get('/', async (req, res) => {
  try {
    const { category, difficulty, search, page = 1, limit = 20 } = req.query;
    const query = {};
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    if (search) query.$text = { $search: search };

    const total = await Algorithm.countDocuments(query);
    const algorithms = await Algorithm.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ name: 1 });

    res.json({ success: true, count: algorithms.length, total, page: parseInt(page), data: algorithms });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/algorithms/:id
router.get('/:id', async (req, res) => {
  try {
    const algorithm = await Algorithm.findById(req.params.id);
    if (!algorithm) return res.status(404).json({ success: false, message: 'Algorithm not found' });
    res.json({ success: true, data: algorithm });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/algorithms/:id/bookmark  (protected)
router.post('/:id/bookmark', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const algoId = req.params.id;
    const isBookmarked = user.bookmarkedAlgorithms.includes(algoId);

    if (isBookmarked) {
      user.bookmarkedAlgorithms = user.bookmarkedAlgorithms.filter(id => id.toString() !== algoId);
    } else {
      user.bookmarkedAlgorithms.push(algoId);
    }
    await user.save();
    res.json({ success: true, bookmarked: !isBookmarked });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;