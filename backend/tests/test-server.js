import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Minimal CORS
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ui_componts';

console.log('Starting server...');
console.log('MongoDB URI:', MONGO_URI);

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('✓ MongoDB connected');
  })
  .catch((err) => {
    console.error('✗ MongoDB error:', err.message);
  });

// Simple test endpoint
app.get('/test', (req, res) => {
  res.json({ status: 'ok', message: 'Server is working' });
});

// Get components
app.get('/api/components', async (req, res) => {
  try {
    console.log('GET /api/components called');
    if (mongoose.connection.readyState !== 1) {
      console.log('Database not ready:', mongoose.connection.readyState);
      return res.status(503).json({ error: 'Database not connected' });
    }
    
    // Import here to avoid schema issues
    const { Component } = await import('./models/ComponentModel.js');
    const components = await Component.find({});
    console.log('Found', components.length, 'components');
    res.json(components);
  } catch (error) {
    console.error('Error fetching components:', error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`  Test: curl http://localhost:${PORT}/test`);
  console.log(`  Components: curl http://localhost:${PORT}/api/components`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

// Keep server running
process.on('SIGINT', () => {
  console.log('\nShutting down...');
  server.close();
  mongoose.connection.close();
  process.exit(0);
});
