import mongoose from 'mongoose';
import { User } from './models/UserModel.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ui_componts';

async function checkDatabase() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB\n');

    const users = await User.find({});
    console.log(`📊 Total users: ${users.length}\n`);

    users.forEach(user => {
      console.log(`👤 User: ${user.name}`);
      console.log(`   📧 Email: ${user.email}`);
      console.log(`   🔒 Password: ${user.password ? '✅ SAVED' : '❌ NOT SAVED (null)'}`);
      console.log(`   ✅ Verified: ${user.isVerified}`);
      console.log(`   🔐 OTP: ${user.otp || '❌ null/cleared'}`);
      console.log(`   ⏰ OTP Expiry: ${user.otpExpiry || '❌ null/cleared'}`);
      console.log('   ---\n');
    });

    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

checkDatabase();
