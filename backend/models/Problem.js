const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  platform: { type: String, required: true, enum: ['LeetCode', 'Codeforces', 'USACO', 'AtCoder', 'HackerRank'] },
  difficulty: { type: String, required: true, enum: ['Easy', 'Medium', 'Hard'] },
  tags: [String],
  link: { type: String, required: true },
  description: { type: String, default: '' },
  acceptanceRate: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

problemSchema.index({ title: 'text', tags: 'text' });

module.exports = mongoose.model('Problem', problemSchema);