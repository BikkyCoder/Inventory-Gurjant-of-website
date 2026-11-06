import mongoose from 'mongoose';
import { User } from './models/UserModel.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ui_componts';

async function cleanUserData() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // Delete all unverified users (those who haven't completed OTP verification)
    const result = await User.deleteMany({ isVerified: false });
    console.log(`🗑️  Deleted ${result.deletedCount} unverified users`);

    // Show remaining users
    const remainingUsers = await User.find({});
    console.log('\n📊 Remaining users in database:');
    remainingUsers.forEach(user => {
      console.log(`  - Email: ${user.email}, Verified: ${user.isVerified}, Password: ${user.password ? '✅ Saved' : '❌ Not saved'}`);
    });

    await mongoose.disconnect();
    console.log('\n✅ Done! Database cleaned.');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

cleanUserData();
