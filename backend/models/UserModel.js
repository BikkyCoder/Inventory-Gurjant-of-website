import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  blocked: {
    type: Boolean,
    default: false,
  },
  blockReason: {
    type: String,
    default: '',
  },
  blockedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  plan: {
    type: String,
    enum: ['free', 'premium'],
    default: 'free'
  },
  premiumUntil: {
    type: Date,
    default: null
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

export const User = mongoose.model('User', userSchema);
