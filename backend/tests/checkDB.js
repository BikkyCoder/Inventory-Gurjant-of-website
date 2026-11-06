import mongoose from 'mongoose';
import { User } from './models/UserModel.js';
import { PendingSignup } from './models/PendingSignupModel.js';

const MONGO_URI = 'mongodb://127.0.0.1:27017/ui_componts';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('✅ Connected to MongoDB');
  
  try {
    const userCount = await User.countDocuments();
    const pendingCount = await PendingSignup.countDocuments();
    
    console.log(`\n📊 Database Statistics:`);
    console.log(`   Users: ${userCount}`);
    console.log(`   Pending Signups: ${pendingCount}`);
    
    // Check User collection indexes
    console.log(`\n📋 User Collection Indexes:`);
    const userIndexes = await User.collection.getIndexes();
    console.log(JSON.stringify(userIndexes, null, 2));
    
    // Check PendingSignup collection indexes
    console.log(`\n📋 PendingSignup Collection Indexes:`);
    const pendingIndexes = await PendingSignup.collection.getIndexes();
    console.log(JSON.stringify(pendingIndexes, null, 2));
    
    // List all users
    if (userCount > 0) {
      console.log(`\n👥 All Users:`);
      const users = await User.find({});
      users.forEach((user, i) => {
        console.log(`\n${i + 1}. ${user.name} (${user.email})`);
        console.log(`   ID: ${user._id}`);
        console.log(`   Verified: ${user.isVerified}`);
        console.log(`   Has Password: ${!!user.password}`);
        console.log(`   Has GoogleId: ${!!user.googleId}`);
      });
    }
    
    // List all pending signups
    if (pendingCount > 0) {
      console.log(`\n⏳ All Pending Signups:`);
      const pending = await PendingSignup.find({});
      pending.forEach((p, i) => {
        console.log(`\n${i + 1}. ${p.name} (${p.email})`);
        console.log(`   Has Password Hash: ${!!p.passwordHash}`);
        console.log(`   Has GoogleId: ${!!p.googleId}`);
        console.log(`   OTP: ${p.otp}`);
      });
    }
    
  } catch (error) {
    console.error('Error checking database:', error.message);
  }
  
  await mongoose.connection.close();
  console.log('\n✅ Connection closed');
  process.exit(0);
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});
