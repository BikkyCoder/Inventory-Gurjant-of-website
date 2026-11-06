import mongoose from 'mongoose';

const pendingSignupSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  passwordHash: {
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
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export const PendingSignup = mongoose.model('PendingSignup', pendingSignupSchema);
