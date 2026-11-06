import mongoose from 'mongoose';
import { User } from '../models/UserModel.js';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ui_components';
  console.log(`\n📡 MongoDB Connection Test`);
  console.log(`📍 Database URL: ${mongoUri}`);
  console.log(`⏰ Testing at: ${new Date().toLocaleString()}`);
  console.log(`${'='.repeat(50)}\n`);
  
  try {
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB successfully');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    return false;
  }
};

const testConnection = async () => {
  try {
    const db = mongoose.connection;
    const mongoDb = db.getClient().db(db.name);
    
    // Get all users
    const allUsers = await User.find({}).sort({ createdAt: -1 });
    
    console.log(`\n📊 Users in Database (${allUsers.length} total):\n`);
    
    if (allUsers.length === 0) {
      console.log('⚠️  No users found yet. This is normal for a new setup.');
      console.log('\n✅ Database connection is working correctly!');
      console.log('📝 After signup/OTP verification, users will appear here.');
    } else {
      allUsers.forEach((user, index) => {
        console.log(`${index + 1}. User:`);
        console.log(`   📧 Email: ${user.email}`);
        console.log(`   👤 Name: ${user.name || '(not set)'}`);
        console.log(`   ✅ Verified: ${user.isVerified}`);
        console.log(`   🔐 Password Set: ${!!user.password}`);
        console.log(`   📅 Created: ${user.createdAt.toLocaleString()}`);
        console.log();
      });
    }
    
    console.log(`${'='.repeat(50)}`);
    console.log(`✅ Database test completed successfully!`);
    
  } catch (error) {
    console.error('❌ Test error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n✅ Connection closed\n');
  }
};

// Run test
(async () => {
  const connected = await connectDB();
  if (connected) {
    await testConnection();
  }
  process.exit(0);
})();
