import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { jwtDecode } from 'jwt-decode';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { Component } from './models/ComponentModel.js';
import { Website } from './models/WebsiteModel.js';
import { ImportComponent } from './models/ImportComponentModel.js';
import { User } from './models/UserModel.js';
import { PendingSignup } from './models/PendingSignupModel.js';
import { AdminAccount } from './models/AdminAccountModel.js';

dotenv.config();

// Debug: Log environment variables to verify dotenv loading
console.log('Environment Variables:', {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  FRONTEND_URL: process.env.FRONTEND_URL
});

const app = express();

// Enhanced CORS configuration
// Production-safe CORS configuration
// Only allows requests from configured frontend domains
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like curl, or server-to-server)
    if (!origin) return callback(null, true);

    // Base allowed origins - includes both production and development
    const allowed = [
      // Production
      'https://uiinventory.com',
      'https://www.uiinventory.com',
      'https://api.uiinventory.com',
      // Development - Local ports
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:5176',
      'http://localhost:7001',
      'http://localhost:7002',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174',
      'http://127.0.0.1:5175',
      'http://127.0.0.1:5176',
      'http://127.0.0.1:7001',
      'http://127.0.0.1:7002',
      'http://localhost:3000',
      'http://localhost:5001'
    ];

    // Add frontend URL from env (if provided) and server IP variants
    const envFrontend = process.env.FRONTEND_URL;
    if (envFrontend && allowed.indexOf(envFrontend) === -1) {
      allowed.push(envFrontend);
      // also allow same host without port and with 0.0.0.0 style
      try {
        const parsed = new URL(envFrontend);
        allowed.push(`${parsed.protocol}//${parsed.hostname}`);
      } catch (e) {
        // ignore parse errors
      }
    }

    // Allow requests if origin is in allowed list
    if (allowed.indexOf(origin) !== -1) {
      return callback(null, true);
    }

    // Log unauthorized origins (strict mode for production)
    console.warn('⚠️  CORS: Blocked request from unauthorized origin:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept']
}));

app.use(express.json());

// OPTIONS handler for CORS preflight (MUST be before routes)
app.options('*', cors());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running', port: process.env.PORT || 7000 });
});

// Root API endpoints
app.get('/api', (req, res) => {
  res.send('API is running 🚀');
});

app.get('/api/', (req, res) => {
  res.send('API root working 🚀');
});

// Request logging middleware
app.use((req, res, next) => {
  if (req.path.includes('/api/')) {
    console.log(`\n📨 [${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
    console.log(`   Headers:`, { origin: req.get('origin'), contentType: req.get('content-type') });
  }
  next();
});

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ui_components';

// Log which host/db we'll connect to (mask credentials if present)
let mongoHostDisplay = MONGO_URI;
try {
  const url = new URL(MONGO_URI);
  mongoHostDisplay = `${url.protocol}//${url.hostname}${url.port ? ':' + url.port : ''}${url.pathname}`;
} catch (e) {
  // ignore parsing errors, keep raw string
}
console.log('Using MongoDB URI (masked):', mongoHostDisplay);

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('Connected to MongoDB successfully');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
  console.error('\\n======================================================');
  console.error('⚠️  CRITICAL: MONGODB CONNECTION FAILED');
  console.error('⚠️  Your IP address is likely not whitelisted on MongoDB Atlas.');
  console.error('⚠️  Please go to MongoDB Atlas -> Network Access -> Add IP Address.');
  console.error('⚠️  The server is running but database operations will fail.');
  console.error('======================================================\\n');
  // process.exit(1); // Removed so server doesn't crash
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// ==================== EMAIL & OTP CONFIGURATION ====================

// Email transporter configuration (using Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
});

// Generate OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP Email
const sendOTPEmail = async (email, otp) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: email,
      subject: 'Your OTP for Signup Verification',
      html: `
        <div style="
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  max-width: 600px;
  margin: 40px auto;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
">

  <!-- Header -->
  <div style="
    background: linear-gradient(135deg, #22c55e, #16a34a);
    padding: 24px;
    text-align: center;
  ">
    <h1 style="
      margin: 0;
      color: #ffffff;
      font-size: 26px;
      letter-spacing: 0.5px;
    ">
      UI Inventory
    </h1>
    <p style="
      margin: 6px 0 0;
      color: #dcfce7;
      font-size: 14px;
    ">
      UI Components · Live Preview · Code
    </p>
  </div>

  <!-- Body -->
  <div style="padding: 32px;">
    <h2 style="
      margin-top: 0;
      color: #111827;
      font-size: 20px;
    ">
      Verify your email
    </h2>

    <p style="
      font-size: 15px;
      color: #4b5563;
      line-height: 1.6;
    ">
      Welcome to <strong>UI Inventory</strong> 🎉  
      To complete your signup, please use the verification code below.
    </p>

<!-- OTP Box -->
<div style="
  margin: 28px 0;
  padding: 22px;
  background: #f0fdf4;
  border: 1px dashed #22c55e;
  border-radius: 10px;
  text-align: center;
">
  <div style="
    font-size: 13px;
    color: #15803d;
    margin-bottom: 8px;
    letter-spacing: 1px;
  ">
    YOUR OTP CODE
  </div>

  <!-- Copy-friendly OTP -->
  <div style="
    font-size: 36px;
    font-weight: 700;
    color: #22c55e;
    letter-spacing: 6px;
    font-family: monospace;
    user-select: all;
    -webkit-user-select: all;
    -ms-user-select: all;
    cursor: pointer;
  ">
    ${otp}
  </div>

  <div style="
    margin-top: 8px;
    font-size: 12px;
    color: #166534;
  ">
    Click the code to select & copy
  </div>
</div>

    <p style="
      font-size: 14px;
      color: #6b7280;
    ">
      ⏱ This code will expire in <strong>10 minutes</strong>.
    </p>

    <p style="
      font-size: 13px;
      color: #9ca3af;
      margin-top: 24px;
    ">
      If you didn't request this email, you can safely ignore it.
    </p>
  </div>

  <!-- Footer -->
  <div style="
    background: #f9fafb;
    padding: 18px;
    text-align: center;
    font-size: 12px;
    color: #9ca3af;
  ">
    © ${new Date().getFullYear()} UI Inventory. All rights reserved.
  </div>

</div>

      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return false;
  }
};

// ==================== MIDDLEWARE (Must be defined before routes that use them) ====================

// Middleware to verify admin JWT token and extract admin info
const verifyAdminToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No admin token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    if (!decoded.adminId) {
      return res.status(401).json({ message: 'Invalid admin token' });
    }
    
    const admin = await AdminAccount.findById(decoded.adminId).select('-password');
    if (!admin) {
      return res.status(401).json({ message: 'Admin account not found' });
    }
    
    if (!admin.isActive) {
      return res.status(403).json({ message: 'Admin account is disabled' });
    }
    
    req.admin = admin;
    req.adminRole = admin.role;
    req.adminId = admin._id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired admin token', error: error.message });
  }
};

// Middleware to check if admin is super-admin (for protected operations)
const requireSuperAdmin = (req, res, next) => {
  if (req.adminRole !== 'super-admin') {
    return res.status(403).json({ message: 'Only Super Admin can perform this action' });
  }
  next();
};

// ==================== SSE (Server-Sent Events) for real-time component updates ====================

// Store active SSE connections
const sseClients = new Set();

// SSE endpoint for component change notifications
app.get('/api/components/events', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });

  // Send initial connection event
  res.write(`data: ${JSON.stringify({ type: 'connected', message: 'Connected to component update stream' })}\n\n`);

  // Add client to set
  sseClients.add(res);
  console.log(`🟢 SSE client connected. Total clients: ${sseClients.size}`);

  // Keep alive - send ping every 30 seconds
  const keepAlive = setInterval(() => {
    try {
      res.write(`:keepalive\n\n`);
    } catch (e) {
      clearInterval(keepAlive);
    }
  }, 30000);

  // Remove client on disconnect
  req.on('close', () => {
    sseClients.delete(res);
    clearInterval(keepAlive);
    console.log(`🔴 SSE client disconnected. Total clients: ${sseClients.size}`);
  });
});

// Helper function to notify all SSE clients about component changes
const notifyComponentChange = (action, component) => {
  const message = JSON.stringify({
    type: 'component_change',
    action, // 'created', 'updated', 'deleted'
    component: component ? { _id: component._id, name: component.name } : null,
    timestamp: new Date().toISOString()
  });

  sseClients.forEach(client => {
    try {
      client.write(`event: component_change\n`);
      client.write(`data: ${message}\n\n`);
    } catch (e) {
      sseClients.delete(client);
    }
  });

  console.log(`📢 SSE notification sent: ${action} - Total clients notified: ${sseClients.size}`);
};

// ==================== COMPONENT API ROUTES (Admin-protected) ====================

// Get all components
// Supports ?visible=true to filter out hidden components (for frontend/website use)
// Without the query param, returns ALL components (for admin panel use)
// Requires admin authentication when visible=true is NOT set
app.get('/api/components', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    
    // Build query filter
    const filter = {};
    
    // If ?visible=true is passed, only return components where isHidden !== true
    // This is the public-facing endpoint (no auth needed)
    if (req.query.visible === 'true') {
      filter.isHidden = { $ne: true };
      const components = await Component.find(filter);
      return res.json(components);
    }
    
    // Without ?visible=true, this is an admin request
    // Verify admin token to ensure only authenticated admins can see all components
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ error: 'Admin authentication required' });
      }
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      if (!decoded.adminId) {
        return res.status(401).json({ error: 'Invalid admin token' });
      }
      
      const admin = await AdminAccount.findById(decoded.adminId).select('-password');
      if (!admin) {
        return res.status(401).json({ error: 'Admin account not found' });
      }
      
      if (!admin.isActive) {
        return res.status(403).json({ error: 'Admin account is disabled' });
      }
    } catch (authError) {
      return res.status(401).json({ error: 'Admin authentication failed: ' + authError.message });
    }
    
    const components = await Component.find(filter);
    res.json(components);
  } catch (error) {
    console.error('Error fetching components:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add a component (Admin only - requires valid admin token)
app.post('/api/components', verifyAdminToken, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    const component = new Component(req.body);
    await component.save();
    // Notify SSE clients about the new component
    notifyComponentChange('created', component);
    res.status(201).json(component);

  } catch (error) {
    console.error('Error saving component:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update a component (Admin only - requires valid admin token)
app.put('/api/components/:id', verifyAdminToken, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    const component = await Component.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!component) {
      return res.status(404).json({ error: 'Component not found' });
    }
    // Notify SSE clients about the updated component
    notifyComponentChange('updated', component);
    res.json(component);

  } catch (error) {
    console.error('Error updating component:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a component (Admin only - requires valid admin token)
app.delete('/api/components/:id', verifyAdminToken, async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    const component = await Component.findByIdAndDelete(req.params.id);
    if (!component) {
      return res.status(404).json({ error: 'Component not found' });
    }
    // Notify SSE clients about the deleted component
    notifyComponentChange('deleted', component);
    res.json({ message: 'Component deleted successfully', component });

  } catch (error) {
    console.error('Error deleting component:', error);
    res.status(500).json({ error: error.message });
  }
});

// ==================== WEBSITES API ====================

// Get all websites
app.get('/api/websites', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    const websites = await Website.find({});
    res.json(websites);
  } catch (error) {
    console.error('Error fetching websites:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get a single website by url
app.get('/api/websites/:url', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    const website = await Website.findOne({ url: req.params.url });
    if (!website) {
      return res.status(404).json({ error: 'Website not found' });
    }
    res.json(website);
  } catch (error) {
    console.error('Error fetching website:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add a website
app.post('/api/websites', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    const website = new Website(req.body);
    await website.save();
    res.status(201).json(website);
  } catch (error) {
    console.error('Error saving website:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update a website
app.put('/api/websites/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    const website = await Website.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!website) {
      return res.status(404).json({ error: 'Website not found' });
    }
    res.json(website);
  } catch (error) {
    console.error('Error updating website:', error);
    res.status(500).json({ error: error.message });
  }
});

// Import Components APIs
// Get all import components
app.get('/api/import-components', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    const components = await ImportComponent.find();
    res.json(components);
  } catch (error) {
    console.error('Error fetching import components:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get import component by name
app.get('/api/import-components/:name', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    const component = await ImportComponent.findOne({ name: req.params.name });
    if (!component) {
      return res.status(404).json({ error: 'Component not found' });
    }
    res.json(component);
  } catch (error) {
    console.error('Error fetching import component:', error);
    res.status(500).json({ error: error.message });
  }
});

// Save import component
app.post('/api/import-components', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    const { name, fileName, code, description, category } = req.body;
    
    const component = new ImportComponent({
      name,
      fileName,
      code,
      description,
      category
    });
    
    const saved = await component.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error('Error saving import component:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update import component
app.put('/api/import-components/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    const { name, code, description, category } = req.body;
    const component = await ImportComponent.findByIdAndUpdate(
      req.params.id,
      { name, code, description, category },
      { new: true }
    );
    if (!component) {
      return res.status(404).json({ error: 'Component not found' });
    }
    res.json(component);
  } catch (error) {
    console.error('Error updating import component:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete import component
app.delete('/api/import-components/:id', async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ error: 'Database not connected' });
    }
    const component = await ImportComponent.findByIdAndDelete(req.params.id);
    if (!component) {
      return res.status(404).json({ error: 'Component not found' });
    }
    res.json({ message: 'Component deleted successfully' });
  } catch (error) {
    console.error('Error deleting import component:', error);
    res.status(500).json({ error: error.message });
  }
});

// Google Sign-up endpoint
app.post('/api/auth/google-signup', async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    // Decode the JWT token (without verifying signature - Google handles verification)
    let decoded;
    try {
      decoded = jwtDecode(token);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    const { email, name } = decoded;

    if (!email || !name) {
      return res.status(400).json({ message: 'Email and name are required from Google' });
    }

    // Normalize email to lowercase and trim
    const normalizedEmail = email.toLowerCase().trim();

    // Prefer PendingSignup flow for Google signups: create/update a pending signup
    // This keeps behavior consistent with email signups (passwords saved only after OTP)
    const otp = String(generateOTP()).trim();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // If a verified user exists, auto-login
    let existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser && existingUser.isVerified) {
      const userToken = jwt.sign({ email: normalizedEmail, userId: existingUser._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });
      return res.json({ success: true, token: userToken, user: { name: existingUser.name, email: existingUser.email, isVerified: existingUser.isVerified }, message: 'Welcome back!' });
    }

    // Update or create a PendingSignup
    let pending = await PendingSignup.findOne({ email: normalizedEmail });
    if (pending) {
      pending.name = name;
      pending.googleId = token;
      pending.otp = otp;
      pending.otpExpiry = otpExpiry;
      await pending.save();
    } else {
      // Create pending signup without a passwordHash (user may set during verify)
      pending = new PendingSignup({ name, email: normalizedEmail, googleId: token, otp, otpExpiry });
      await pending.save();
    }

    const emailSent = await sendOTPEmail(normalizedEmail, otp);
    if (!emailSent) return res.status(500).json({ message: 'Failed to send OTP email' });

    res.json({ success: true, message: 'OTP sent to your email', email: normalizedEmail, name, pendingId: pending._id });
  } catch (error) {
    console.error('Google signup error:', error);
    res.status(500).json({ 
      message: 'Error processing Google sign-up',
      error: error.message 
    });
  }
});

// Debug endpoint - check OTP for testing purposes (REMOVE IN PRODUCTION)
app.get('/api/auth/debug-otp/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const normalizedEmail = email.toLowerCase().trim();
    
    // First check PendingSignup (most recent signups)
    let pending = await PendingSignup.findOne({ email: normalizedEmail });
    if (pending) {
      const now = new Date();
      const isExpired = now > pending.otpExpiry;
      const timeRemaining = isExpired ? 0 : Math.floor((pending.otpExpiry - now) / 1000);

      return res.json({
        email: pending.email,
        otp: pending.otp,
        otpExpiry: pending.otpExpiry,
        source: 'PendingSignup',
        currentTime: now,
        isExpired: isExpired,
        timeRemaining: timeRemaining + ' seconds'
      });
    }
    
    // Fallback to User collection (legacy OTP verification)
    const user = await User.findOne({ email: normalizedEmail });
    if (user) {
      const now = new Date();
      const isExpired = now > user.otpExpiry;
      const timeRemaining = isExpired ? 0 : Math.floor((user.otpExpiry - now) / 1000);

      return res.json({
        email: user.email,
        otp: user.otp,
        otpExpiry: user.otpExpiry,
        isVerified: user.isVerified,
        source: 'User',
        currentTime: now,
        isExpired: isExpired,
        timeRemaining: timeRemaining + ' seconds'
      });
    }
    
    return res.status(404).json({ message: 'No pending signup or user found for this email' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Test endpoint - clear user and resend OTP
app.post('/api/auth/test-reset/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const normalizedEmail = email.toLowerCase().trim();
    
    // Delete the user
    await User.deleteOne({ email: normalizedEmail });

    res.json({ 
      message: 'User deleted. Please sign up again.',
      email: normalizedEmail
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Test endpoint - manually set OTP for testing
app.post('/api/auth/test-set-otp/:email/:otp', async (req, res) => {
  try {
    const { email, otp } = req.params;
    const normalizedEmail = email.toLowerCase().trim();
    
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Set OTP to the provided value
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    res.json({ 
      message: 'OTP set for testing',
      email: user.email,
      otp: user.otp,
      otpExpiry: user.otpExpiry
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify OTP endpoint
app.post('/api/auth/verify-otp', async (req, res) => {
  console.log('\n✅ [VERIFY-OTP] POST request received!');
  console.log('   Body:', req.body);
  
  try {
    const { email, otp, password } = req.body;

    console.log(`\n[VERIFY-OTP] Received request with email: ${email}, otp: ${otp}, passwordProvided: ${password ? `✓ (length: ${password.length})` : '✗'}`);

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // First check pending signup
    let pending = await PendingSignup.findOne({ email: normalizedEmail });
    if (!pending) {
      // Fallback: if no pending signup, check existing user and existing OTP flow
      const user = await User.findOne({ email: normalizedEmail });
      if (!user) {
        return res.status(404).json({ message: 'No pending signup or user found for this email' });
      }

      // existing user flow (legacy) - compare otp stored on user
      const dbOTP = String(user.otp || '').trim();
      const providedOTP = String(otp).trim();
      if (!dbOTP || dbOTP !== providedOTP) {
        return res.status(400).json({ message: 'Invalid OTP' });
      }
      if (new Date() > user.otpExpiry) return res.status(400).json({ message: 'OTP has expired' });

      // Save password if provided
      if (password && password.trim() !== '') {
        user.password = await bcrypt.hash(password, 10);
      }
      user.isVerified = true;
      user.otp = null;
      user.otpExpiry = null;
      await user.save();

      const token = jwt.sign({ email: normalizedEmail, userId: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });
      return res.json({ success: true, token, user: { name: user.name, email: user.email, isVerified: user.isVerified }, message: 'Email verified successfully' });
    }

    // Validate OTP for pending signup
    const dbOTP = String(pending.otp || '').trim();
    const providedOTP = String(otp).trim();
    console.log(`[VERIFY-OTP] OTP Validation - DB: ${dbOTP}, Provided: ${providedOTP}, Match: ${dbOTP === providedOTP}`);
    
    if (!dbOTP || dbOTP !== providedOTP) {
      return res.status(400).json({ message: 'Invalid OTP - please try again' });
    }
    if (new Date() > pending.otpExpiry) {
      return res.status(400).json({ message: 'OTP has expired - please request a new one' });
    }

    // Create final user record using pending data
    // Prefer a password supplied during verification; otherwise use pending.passwordHash
    let finalPasswordHash = pending.passwordHash || null;
    if (password && password.trim() !== '') {
      try {
        finalPasswordHash = await bcrypt.hash(password, 10);
        console.log('[VERIFY-OTP] Password re-hashed from verification:', { email: normalizedEmail, hashLength: finalPasswordHash.length });
      } catch (hashErr) {
        console.error('[VERIFY-OTP] Error hashing provided password:', hashErr);
        return res.status(500).json({ message: 'Error processing password' });
      }
    }

    // ═══════════════════════════════════════════════════════════════
    // FIX: Clear googleId from pending if regular user sets password
    // ═══════════════════════════════════════════════════════════════
    let isGoogleSignup = !!pending.googleId;
    
    // If user provided a password alongside their email, this is regular signup
    if (password && password.trim() !== '' && isGoogleSignup) {
      console.log('[VERIFY-OTP] 🔧 Password provided for Google-originated signup. Treating as regular signup.');
      pending.googleId = undefined;
      isGoogleSignup = false;
    }

    console.log('[VERIFY-OTP] Signup type:', { isGoogleSignup, hasPassword: !!finalPasswordHash, email: normalizedEmail });

    // For regular signups, password is REQUIRED
    // For Google signups, password is optional (user can set later)
    if (!isGoogleSignup && (!finalPasswordHash || finalPasswordHash.trim() === '')) {
      console.error('[VERIFY-OTP] CRITICAL: No password hash available for regular signup user:', normalizedEmail);
      return res.status(400).json({ 
        message: 'Password is required. Please provide a password to complete signup.',
        needsPassword: true 
      });
    }

    console.log('[VERIFY-OTP] Creating final user:', { 
      email: normalizedEmail, 
      isGoogleSignup, 
      hasPassword: !!finalPasswordHash, 
      passwordHashLength: finalPasswordHash ? finalPasswordHash.length : 0 
    });

    // ═══════════════════════════════════════════════════════════════
    // FIX: Explicitly set password field instead of using || undefined
    // ═══════════════════════════════════════════════════════════════
    const userData = {
      name: pending.name || '',
      email: normalizedEmail,
      isVerified: true
    };
    
    // Explicitly set password only if we have one
    if (finalPasswordHash && finalPasswordHash.trim() !== '') {
      userData.password = finalPasswordHash;
    }
    
    // Set googleId only for actual Google signups
    if (isGoogleSignup && pending.googleId) {
      userData.googleId = pending.googleId;
    }
    
    const newUser = new User(userData);

    // Save with explicit error handling
    try {
      await newUser.save();
      console.log('[VERIFY-OTP] User successfully saved to database:', { 
        email: normalizedEmail, 
        userId: newUser._id,
        isGoogleSignup,
        name: newUser.name,
        verified: newUser.isVerified 
      });
    } catch (saveError) {
      console.error('[VERIFY-OTP] CRITICAL ERROR saving user to database:', {
        error: saveError.message,
        errorCode: saveError.code,
        email: normalizedEmail,
        stack: saveError.stack
      });
      throw saveError;
    }
    
    // Remove pending signup
    try {
      await PendingSignup.deleteOne({ _id: pending._id });
      console.log('[VERIFY-OTP] Pending signup deleted:', pending._id);
    } catch (deleteError) {
      console.error('[VERIFY-OTP] Warning: Could not delete pending signup:', deleteError.message);
    }

    const token = jwt.sign({ email: newUser.email, userId: newUser._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });

    res.json({ success: true, token, user: { name: newUser.name, email: newUser.email, isVerified: newUser.isVerified }, message: 'Email verified successfully! You are now logged in.' });
  } catch (error) {
    console.error('[VERIFY-OTP] Error:', error.message);
    console.error('[VERIFY-OTP] Stack:', error.stack);
    res.status(500).json({ 
      message: 'Error verifying OTP: ' + error.message,
      error: error.message 
    });
  }
});

// Resend OTP endpoint
app.post('/api/auth/resend-otp', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Prefer updating pending signup if present
    const pending = await PendingSignup.findOne({ email: normalizedEmail });
    if (pending) {
      if (new Date() < pending.otpExpiry) {
        // still valid OTP; we'll still generate a fresh one
      }
      const otp = String(generateOTP()).trim();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
      pending.otp = otp;
      pending.otpExpiry = otpExpiry;
      await pending.save();
      const emailSent = await sendOTPEmail(normalizedEmail, otp);
      if (!emailSent) return res.status(500).json({ message: 'Failed to send OTP email' });
      return res.json({ success: true, message: 'OTP resent to your email' });
    }

    // Fallback: update existing user OTP if user exists and not verified
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.isVerified) return res.status(400).json({ message: 'User is already verified' });
    const otp = String(generateOTP()).trim();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();
    const emailSent = await sendOTPEmail(normalizedEmail, otp);
    if (!emailSent) return res.status(500).json({ message: 'Failed to send OTP email' });
    res.json({ success: true, message: 'OTP resent to your email' });
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({ 
      message: 'Error resending OTP',
      error: error.message 
    });
  }
});

// Regular signup endpoint (without Google)
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase().trim();

    // Check if a confirmed user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Generate OTP and expiry
    const otp = String(generateOTP()).trim();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    // Hash password and store in a PendingSignup document (do NOT create final User yet)
    let hashedPassword = null;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (hashErr) {
      console.error('[SIGNUP] Error hashing password:', hashErr);
      return res.status(500).json({ message: 'Error processing password' });
    }

    // If a pending signup exists, update it; otherwise create new pending signup
    let pending = await PendingSignup.findOne({ email: normalizedEmail });
    if (pending) {
      // If this pending signup was originally from Google (has googleId but no password),
      // clear the googleId since user is now registering with email+password
      if (pending.googleId) {
        console.log(`[SIGNUP] Clearing googleId from pending signup for ${normalizedEmail} - user chose email signup`);
        pending.googleId = undefined;
      }
      pending.name = name;
      pending.passwordHash = hashedPassword;
      pending.otp = otp;
      pending.otpExpiry = otpExpiry;
      await pending.save();
    } else {
      pending = new PendingSignup({
        name,
        email: normalizedEmail,
        passwordHash: hashedPassword,
        otp,
        otpExpiry
      });
      await pending.save();
    }

    console.log(`[SIGNUP] Pending signup created/updated for ${normalizedEmail}. OTP: ${otp}`);

    // Send OTP to email
    const emailSent = await sendOTPEmail(normalizedEmail, otp);
    if (!emailSent) {
      return res.status(500).json({ message: 'Failed to send OTP email' });
    }

    res.json({
      success: true,
      message: 'OTP sent to your email',
      email: normalizedEmail,
      pendingId: pending._id
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ 
      message: 'Error during signup',
      error: error.message 
    });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: 'Please verify your email first' });
    }

    // Defensive logging to help debug login issues
    try {
      console.log(`[LOGIN] Attempt for ${normalizedEmail} - isVerified: ${user.isVerified}, passwordPresent: ${!!user.password}`);
      if (user.password) {
        console.log(`[LOGIN] Stored password hash length: ${user.password.length}`);
      } else {
        console.warn(`[LOGIN] ⚠️ NO PASSWORD HASH FOUND for user: ${normalizedEmail}`);
      }
    } catch (logErr) {
      console.warn('[LOGIN] Could not log password info:', logErr && logErr.message);
    }

    // Ensure password was actually set (should be saved during OTP verification)
    if (!user.password || typeof user.password !== 'string' || user.password.trim() === '') {
      console.error(`[LOGIN] BLOCKED: Password not set for ${normalizedEmail}. User needs to re-verify with valid password.`);
      return res.status(400).json({ message: 'Password not set. Please verify your email to set a password.' });
    }

    // Compare password
    console.log(`[LOGIN] Comparing password for ${normalizedEmail}. Password length: ${password ? password.length : 0}, Hash length: ${user.password.length}`);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(`[LOGIN] Password comparison result: ${isPasswordValid}`);

    if (!isPasswordValid) {
      console.log(`[LOGIN] ❌ Invalid password attempt for ${normalizedEmail}`);
      return res.status(401).json({ message: 'Invalid password' });
    }

    console.log(`[LOGIN] ✅ Password valid for ${normalizedEmail}`);

    // Generate JWT token
    const token = jwt.sign({ email, userId: user._id }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '7d' });

    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
        isVerified: user.isVerified
      },
      message: 'Login successful'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Error during login',
      error: error.message 
    });
  }
});

// Middleware to verify JWT token and check if user is blocked
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.userId = decoded.userId;
    req.email = decoded.email;
    
    // Check if user is blocked
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    if (user.blocked) {
      return res.status(403).json({ 
        message: 'Your account has been blocked', 
        blocked: true,
        blockReason: user.blockReason 
      });
    }
    
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token', error: error.message });
  }
};

// Check user status (to detect if user is blocked)
app.get('/api/user/status', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ 
      success: true,
      blocked: user.blocked,
      blockReason: user.blocked ? user.blockReason : null,
      verified: user.isVerified
    });
  } catch (error) {
    res.status(500).json({ message: 'Error checking user status', error: error.message });
  }
});

// Update user profile (name)
app.put('/api/update-profile', verifyToken, async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Name is required' });
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { name: name.trim() },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ 
      success: true, 
      user: { 
        name: user.name, 
        email: user.email 
      },
      message: 'Profile updated successfully'
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ 
      message: 'Error updating profile',
      error: error.message 
    });
  }
});

// Debug user info (dev only) - shows verification and password presence (DO NOT USE IN PRODUCTION)
app.get('/api/auth/debug-user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    if (!email) return res.status(400).json({ message: 'Email required' });
    const normalizedEmail = email.toLowerCase().trim();
    // Return either pending signup info or existing user info
    const pending = await PendingSignup.findOne({ email: normalizedEmail });
    if (pending) {
      return res.json({
        type: 'pending',
        email: pending.email,
        name: pending.name,
        passwordPresent: !!pending.passwordHash,
        otp: pending.otp || null,
        otpExpiry: pending.otpExpiry || null,
      });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({
      type: 'user',
      email: user.email,
      isVerified: !!user.isVerified,
      passwordPresent: !!user.password,
      passwordHashPreview: user.password ? user.password.substring(0, 6) + '...' : null,
      otp: user.otp || null,
      otpExpiry: user.otpExpiry || null,
    });
  } catch (err) {
    console.error('Debug user error:', err);
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
});

// Account Recovery - Verify unverified account
app.post('/api/auth/verify-account', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    
    // Find the user
    const user = await User.findOne({ email: normalizedEmail });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If already verified, return success
    if (user.isVerified) {
      return res.json({ 
        success: true, 
        message: 'Account is already verified!',
        isVerified: true 
      });
    }

    // Mark account as verified (account recovery for unverified accounts)
    user.isVerified = true;
    await user.save();

    console.log(`[ACCOUNT RECOVERY] Account verified for: ${normalizedEmail}`);

    res.json({ 
      success: true, 
      message: 'Account has been verified! You can now login.',
      isVerified: true,
      email: user.email
    });
  } catch (error) {
    console.error('Account verification error:', error);
    res.status(500).json({ 
      message: 'Error verifying account',
      error: error.message 
    });
  }
});

// Forgot Password - Send OTP
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    
    // Find the user
    const user = await User.findOne({ email: normalizedEmail });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save OTP to user
    user.otp = otp;
    user.otpExpiry = otpExpiry;
    await user.save();

    // Send OTP via email
    try {
    await transporter.sendMail({
  from: `"UI Components" <${process.env.EMAIL_USER}>`,
  to: normalizedEmail,
  subject: '🔐 Password Reset OTP',
  html: `
  <div style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,sans-serif;">
    <table align="center" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <tr>
        <td style="background:green;padding:20px;text-align:center;color:white;">
          <h1 style="margin:0;font-size:24px;">UI Components</h1>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="padding:30px;text-align:center;">
          <h2 style="margin-bottom:10px;color:#333;">Password Reset Request</h2>
          <p style="color:#555;font-size:14px;">Use the OTP below to reset your password</p>

          <!-- OTP Box -->
          <div style="margin:20px auto;padding:15px 25px;background:#f3f4f6;border-radius:8px;display:inline-block;">
            <span style="font-size:28px;letter-spacing:4px;font-weight:bold;color:#111;">
              ${otp}
            </span>
          </div>

          <p style="color:#777;font-size:13px;margin-top:20px;">
            ⏳ This OTP will expire in <strong>10 minutes</strong>
          </p>

          <p style="color:#999;font-size:12px;margin-top:20px;">
            If you didn't request this, you can safely ignore this email.
          </p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#f9fafb;padding:15px;text-align:center;font-size:12px;color:#aaa;">
          © 2026 UI Components • All rights reserved
        </td>
      </tr>

    </table>
  </div>
  `,
});
      console.log(`[FORGOT-PASSWORD] OTP sent to ${normalizedEmail}`);
    } catch (emailErr) {
      console.error('Error sending OTP email:', emailErr);
    }

    res.json({ 
      success: true, 
      message: 'OTP sent to your email. Check your inbox!',
      email: normalizedEmail
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ 
      message: 'Error processing password reset request',
      error: error.message 
    });
  }
});

// Reset Password with OTP
app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'Email, OTP, and new password are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    
    // Find the user
    const user = await User.findOne({ email: normalizedEmail });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify OTP
    const dbOTP = String(user.otp || '').trim();
    const providedOTP = String(otp).trim();
    
    if (dbOTP !== providedOTP) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    // Validate new password
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Hash and save new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = null;
    user.otpExpiry = null;
    user.isVerified = true;
    await user.save();

    console.log(`[RESET-PASSWORD] Password reset successfully for ${normalizedEmail}`);

    res.json({ 
      success: true, 
      message: 'Password reset successfully! You can now login with your new password.',
      email: normalizedEmail
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ 
      message: 'Error resetting password',
      error: error.message 
    });
  }
});

// Helper endpoint - Check all users and fix password issues
app.post('/api/auth/fix-passwords', async (req, res) => {
  try {
    const { adminSecret } = req.body;
    
    // Simple security check
    if (adminSecret !== 'temp-admin-secret-12345') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const users = await User.find({});
    let fixed = 0;
    const issues = [];

    for (const user of users) {
      // Check if password is empty or doesn't look like a hash
      if (!user.password || user.password.length < 20) {
        issues.push({
          email: user.email,
          problem: 'Password missing or too short',
          passwordLength: user.password ? user.password.length : 0
        });
        
        // Try to fix: set a default password or mark for reset
        if (!user.password) {
          // Set temporary password (user must reset)
          user.password = await bcrypt.hash('temp-reset-required-' + Math.random(), 10);
          user.isVerified = false; // Force re-verify
          await user.save();
          fixed++;
        }
      } else if (!user.password.startsWith('$2')) {
        // Password doesn't look like bcrypt hash
        issues.push({
          email: user.email,
          problem: 'Password not in bcrypt format',
          passwordPreview: user.password.substring(0, 20)
        });
      }
    }

    res.json({
      success: true,
      totalUsers: users.length,
      fixed: fixed,
      issues: issues,
      message: `Checked ${users.length} users. Fixed ${fixed} issues.`
    });
  } catch (error) {
    console.error('Fix passwords error:', error);
    res.status(500).json({ 
      message: 'Error checking passwords',
      error: error.message 
    });
  }
});

// One-time account recovery - Set a new password directly
app.post('/api/auth/recover-account', async (req, res) => {
  try {
    const { email, recoverySecret, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Recovery secret for security
    if (recoverySecret !== 'account-recovery-2025') {
      return res.status(403).json({ message: 'Invalid recovery secret' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate password
    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Hash and save password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    console.log(`[ACCOUNT-RECOVERY] Account recovered for ${normalizedEmail}`);

    res.json({
      success: true,
      message: 'Account recovered successfully! You can now login with your new password.',
      email: normalizedEmail
    });
  } catch (error) {
    console.error('Account recovery error:', error);
    res.status(500).json({
      message: 'Error recovering account',
      error: error.message
    });
  }
});

// ============ USERS API ENDPOINTS ============

// Get all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users || []);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Get user by ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully', user });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

// Update user status (verify, block, etc.)
app.put('/api/users/:id', async (req, res) => {
  try {
    const { isVerified, blocked, blockReason } = req.body;
    const updates = {};
    
    if (isVerified !== undefined) updates.isVerified = isVerified;
    if (blocked !== undefined) {
      updates.blocked = blocked;
      if (blocked) {
        updates.blockReason = blockReason || 'No reason provided';
        updates.blockedAt = new Date();
      } else {
        updates.blockReason = '';
        updates.blockedAt = null;
      }
    }
    
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

// Create test user (for demo/testing)
app.post('/api/test/create-demo-user', async (req, res) => {
  try {
    const demoUsers = [
      { name: 'John Doe', email: 'john@example.com', password: 'password123' },
      { name: 'Jane Smith', email: 'jane@example.com', password: 'password123' },
      { name: 'Bob Johnson', email: 'bob@example.com', password: 'password123' }
    ];

    const created = [];
    for (const demoUser of demoUsers) {
      const exists = await User.findOne({ email: demoUser.email });
      if (!exists) {
        const hashedPassword = await bcrypt.hash(demoUser.password, 10);
        const newUser = new User({
          name: demoUser.name,
          email: demoUser.email,
          password: hashedPassword,
          isVerified: true
        });
        await newUser.save();
        created.push({ name: demoUser.name, email: demoUser.email });
      }
    }

    res.json({ 
      message: `${created.length} demo users created successfully!`,
      createdUsers: created
    });
  } catch (error) {
    console.error('Error creating demo users:', error);
    res.status(500).json({ message: 'Error creating demo users', error: error.message });
  }
});

// Get pending signups (for monitoring)
app.get('/api/pending-signups', async (req, res) => {
  try {
    const pending = await PendingSignup.find().sort({ createdAt: -1 });
    res.json(pending || []);
  } catch (error) {
    console.error('Error fetching pending signups:', error);
    res.status(500).json({ message: 'Error fetching pending signups', error: error.message });
  }
});






// ============ END ADMIN ACCOUNTS API ============

// ============ PASSWORD CHECK & FIX ENDPOINTS ============

// Debug: Check if a specific password matches the stored hash for a user
app.post('/api/auth/check-password', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    
    if (!user) {
      return res.status(404).json({ 
        exists: false,
        message: 'User not found' 
      });
    }

    const result = {
      exists: true,
      email: user.email,
      isVerified: user.isVerified,
      passwordPresent: !!user.password,
    };

    if (user.password) {
      const isValid = await bcrypt.compare(password, user.password);
      result.passwordMatch = isValid;
      result.hashPreview = user.password.substring(0, 10) + '...';
      result.hashLength = user.password.length;
    }

    // Check PendingSignup too
    const pending = await PendingSignup.findOne({ email: normalizedEmail });
    if (pending) {
      result.pendingSignupExists = true;
      result.pendingPasswordPresent = !!pending.passwordHash;
    }

    res.json(result);
  } catch (error) {
    console.error('Check password error:', error);
    res.status(500).json({ message: 'Error checking password', error: error.message });
  }
});

// Fix: Re-hash and save password for a user (requires OTP verification first)
app.post('/api/auth/fix-user-password', async (req, res) => {
  try {
    const { email, newPassword, adminSecret } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({ message: 'Email and new password are required' });
    }

    // Simple security check
    if (adminSecret !== 'temp-admin-secret-12345') {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.isVerified = true;
    await user.save();

    // Verify the password was saved correctly
    const savedUser = await User.findOne({ email: normalizedEmail });
    const isValid = await bcrypt.compare(newPassword, savedUser.password);

    res.json({
      success: true,
      message: 'Password fixed successfully',
      passwordSaved: !!savedUser.password,
      passwordVerifyWorks: isValid
    });
  } catch (error) {
    console.error('Fix password error:', error);
    res.status(500).json({ message: 'Error fixing password', error: error.message });
  }
});

// ============ END PASSWORD CHECK & FIX ENDPOINTS ============

const PORT = process.env.PORT || 7000;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`✅ Listening on http://0.0.0.0:${PORT}`);
  console.log(`✅ Accessible from http://localhost:${PORT}`);
});

server.on('error', (err) => {
  if (err && err.code === 'EADDRINUSE') {
    console.error(`Error: port ${PORT} is already in use. ` +
      `Either stop the process using that port or set a different PORT env var before starting the server.`);
    console.error('Example (PowerShell): $env:PORT=5002; npm run dev');
    process.exit(1);
  }
  console.error('Server error:', err);
  process.exit(1);
});
