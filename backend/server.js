const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/algorithms', require('./routes/algorithms'));
app.use('/api/problems', require('./routes/problems'));
app.use('/api/user', require('./routes/user'));

app.post('/api/complexity/calculate', (req, res) => {
  const { n, complexities } = req.body;
  const val = parseInt(n);
  const formulas = {
    'O(1)': 1,
    'O(log n)': Math.log2(val),
    'O(n)': val,
    'O(n log n)': val * Math.log2(val),
    'O(n^2)': val * val,
    'O(2^n)': Math.pow(2, Math.min(val, 50)),
    'O(n!)': (() => { let f = 1; for (let i = 2; i <= Math.min(val, 20); i++) f *= i; return f; })(),
  };
  const results = {};
  complexities.forEach(c => { if (formulas[c] !== undefined) results[c] = Math.round(formulas[c]); });
  res.json({ success: true, n: val, results });
});

app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));