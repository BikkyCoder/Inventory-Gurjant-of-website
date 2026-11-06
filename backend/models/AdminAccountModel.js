import mongoose from 'mongoose';

const adminAccountSchema = new mongoose.Schema({
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
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  // Role: 'super-admin' = main admin (only one), 'admin' = secondary admin
  role: {
    type: String,
    enum: ['super-admin', 'admin'],
    default: 'admin',
  },
  permissions: {
    dashboard: {
      type: Boolean,
      default: true,
    },
    users: {
      type: Boolean,
      default: false,
    },
    adminUsers: {
      type: Boolean,
      default: false,
    },
    components: {
      type: Boolean,
      default: false,
    },
    websites: {
      type: Boolean,
      default: false,
    },
    analytics: {
      type: Boolean,
      default: false,
    },
    settings: {
      type: Boolean,
      default: false,
    },
  },
  createdBy: {
    type: String,
    default: 'system',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const AdminAccount = mongoose.model('AdminAccount', adminAccountSchema);
