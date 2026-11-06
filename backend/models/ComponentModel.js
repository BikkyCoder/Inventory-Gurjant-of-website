import mongoose from 'mongoose';

const componentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  code: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Cards', 'Buttons', 'Header', 'Headers'],
    default: 'Cards'
  },
  subcategory: {
    type: String,
    default: 'General'
  },
  isHidden: {
    type: Boolean,
    default: false
  },
  isPremium: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export const Component = mongoose.model('Component', componentSchema, 'all_components');
