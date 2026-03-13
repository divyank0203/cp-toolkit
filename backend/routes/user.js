const express = require('express');
const protect = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// GET /api/user/dashboard
router.get('/dashboard', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('solvedProblems', 'title difficulty platform tags')
      .populate('bookmarkedAlgorithms', 'name category difficulty complexity');

    const stats = {
      totalSolved: user.solvedProblems.length,
      easySolved: user.solvedProblems.filter(p => p.difficulty === 'Easy').length,
      mediumSolved: user.solvedProblems.filter(p => p.difficulty === 'Medium').length,
      hardSolved: user.solvedProblems.filter(p => p.difficulty === 'Hard').length,
      bookmarked: user.bookmarkedAlgorithms.length,
    };

    res.json({ success: true, user, stats });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;