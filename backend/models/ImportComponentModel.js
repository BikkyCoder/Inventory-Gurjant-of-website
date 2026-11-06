import mongoose from 'mongoose';

const ImportComponentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    fileName: { type: String, required: true },
    code: { type: String, required: true },
    description: { type: String, default: '' },
    category: { type: String, default: 'General' },
  },
  { timestamps: true }
);

export const ImportComponent = mongoose.model('ImportComponent', ImportComponentSchema);
