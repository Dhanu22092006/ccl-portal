require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const path = require('path');
const connectDB = require('./config/db');
const seedDB = require('./utils/seedData');

const app = express();

// Connect to MongoDB
connectDB().then(() => seedDB());

// Rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use(limiter);

// Middleware
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/v1/ccls', require('./routes/cclRoutes'));
app.use('/api/v1/stories', require('./routes/storyRoutes'));
app.use('/api/v1/surveys', require('./routes/surveyRoutes'));
app.use('/api/v1/contacts', require('./routes/contactRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// 404 handler
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Server error', error: process.env.NODE_ENV === 'development' ? err.message : undefined });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 CCL Portal API running on http://localhost:${PORT}`));
