const mongoose = require('mongoose');

const algorithmSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, required: true, enum: ['Searching', 'Sorting', 'Graph', 'String', 'DP', 'Math', 'Tree'] },
  difficulty: { type: String, required: true, enum: ['Easy', 'Medium', 'Hard'] },
  complexity: { type: String, required: true },
  spaceComplexity: { type: String, default: 'O(1)' },
  description: { type: String, required: true },
  code: {
    javascript: { type: String, default: '' },
    cpp: { type: String, default: '' },
    python: { type: String, default: '' },
  },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

algorithmSchema.index({ name: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('Algorithm', algorithmSchema);