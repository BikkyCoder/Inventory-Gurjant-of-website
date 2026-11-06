import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { User } from './models/UserModel.js';

const MONGODB_URI = 'mongodb://127.0.0.1:27017/ui_componts';

async function listUsers() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB\n');

    const users = await User.find({});
    console.log(`Total users in database: ${users.length}\n`);
    
    users.forEach((user, index) => {
      console.log(`User ${index + 1}:`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Name: ${user.name}`);
      console.log(`  Verified: ${user.isVerified}`);
      console.log(`  Has password: ${!!user.password}`);
      if (user.password) {
        console.log(`  Password hash length: ${user.password.length}`);
        console.log(`  Password: ${user.password.substring(0, 30)}...`);
      }
      console.log();
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

listUsers();
