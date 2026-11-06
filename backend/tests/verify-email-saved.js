import mongoose from 'mongoose';
import { User } from '../models/UserModel.js';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ui_components');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

const verifyEmailField = async () => {
  try {
    // Get all users
    const users = await User.find({}).select('name email isVerified createdAt');
    
    console.log('\n📋 ALL USERS IN DATABASE:\n');
    console.log('Total users:', users.length);
    
    if (users.length === 0) {
      console.log('❌ No users found in database');
      return;
    }
    
    users.forEach((user, index) => {
      console.log(`\n${index + 1}. User ID: ${user._id}`);
      console.log(`   Name: ${user.name || '(empty)'}`);
      console.log(`   Email: ${user.email || '(empty)'}`);
      console.log(`   Verified: ${user.isVerified}`);
      console.log(`   Created: ${user.createdAt}`);
      
      if (!user.email) {
        console.log('   ⚠️  WARNING: Email field is empty!');
      }
    });
    
    console.log('\n' + '='.repeat(50));
    
    // Check for duplicate emails
    const emailCounts = {};
    users.forEach(user => {
      if (user.email) {
        emailCounts[user.email] = (emailCounts[user.email] || 0) + 1;
      }
    });
    
    const duplicates = Object.entries(emailCounts).filter(([email, count]) => count > 1);
    
    if (duplicates.length > 0) {
      console.log('\n⚠️  DUPLICATE EMAILS FOUND:');
      duplicates.forEach(([email, count]) => {
        console.log(`   ${email}: ${count} times`);
      });
    } else {
      console.log('\n✅ No duplicate emails found');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
    process.exit(0);
  }
};

// Run the verification
connectDB().then(() => verifyEmailField());
