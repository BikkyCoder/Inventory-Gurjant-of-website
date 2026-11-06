import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { AdminAccount } from './models/AdminAccountModel.js';

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ui_components';
console.log('Connecting to', uri);

await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const email = 'uiinventory@gmail.com';
const admin = await AdminAccount.findOne({ email: email.toLowerCase().trim() });
console.log('Admin found:', !!admin);
if (admin) {
  console.log('stored email:', admin.email);
  console.log('stored active:', admin.isActive);
  console.log('stored role:', admin.role);
  console.log('stored password hash length:', admin.password?.length);
  console.log('stored password hash prefix:', admin.password?.slice(0, 10));
  const match = await bcrypt.compare('0996551GS', admin.password);
  console.log('bcrypt compare for 0996551GS:', match);
}

await mongoose.disconnect();
process.exit(0);
