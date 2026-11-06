import mongoose from 'mongoose';
import { User } from '../models/UserModel.js';
import { PendingSignup } from '../models/PendingSignupModel.js';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ui_components');
    console.log('✅ Connected to MongoDB');
    return true;
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    return false;
  }
};

const debugSignupFlow = async () => {
  try {
    console.log(`\n${'='.repeat(70)}`);
    console.log(`📊 DATABASE STATUS REPORT - ${new Date().toLocaleString()}`);
    console.log(`${'='.repeat(70)}\n`);

    // Check PendingSignups
    const pendingCount = await PendingSignup.countDocuments();
    console.log(`📋 PENDING SIGNUPS: ${pendingCount} records`);
    if (pendingCount > 0) {
      const pendings = await PendingSignup.find({}).limit(5);
      pendings.forEach((p, i) => {
        console.log(`\n  ${i + 1}. Email: ${p.email}`);
        console.log(`     Name: ${p.name || '(not set)'}`);
        console.log(`     OTP: ${p.otp || '(not set)'}`);
        console.log(`     Created: ${p.createdAt.toLocaleString()}`);
      });
    }

    // Check Users
    const usersCount = await User.countDocuments();
    console.log(`\n\n👥 VERIFIED USERS: ${usersCount} records`);
    if (usersCount > 0) {
      const users = await User.find({}).sort({ createdAt: -1 }).limit(5);
      users.forEach((u, i) => {
        console.log(`\n  ${i + 1}. Email: ${u.email}`);
        console.log(`     Name: ${u.name || '(not set)'}`);
        console.log(`     Verified: ${u.isVerified}`);
        console.log(`     Password Set: ${!!u.password}`);
        console.log(`     Created: ${u.createdAt.toLocaleString()}`);
      });
    }

    console.log(`\n\n${'='.repeat(70)}`);
    console.log(`✅ EXPECTED FLOW:`);
    console.log(`${'='.repeat(70)}`);
    console.log(`
1️⃣  SIGNUP
   → User enters email/password
   → Backend creates PendingSignup (visible here)
   → OTP sent to email
   
2️⃣  OTP VERIFICATION  
   → User enters OTP
   → Backend converts PendingSignup → User
   → User moves from PENDING SIGNUPS to VERIFIED USERS
   
3️⃣  LOGIN
   → User logs in with email/password
   → Backend checks User collection
   → Returns JWT token if password matches
   
⚠️  IMPORTANT: New logins via signup flow MUST go through OTP verification!
    Just entering email/password is NOT enough - OTP verification saves to DB!
    `);

    console.log(`\n${'='.repeat(70)}`);

  } catch (error) {
    console.error('❌ Debug error:', error.message);
  } finally {
    await mongoose.connection.close();
  }
};

// Run
(async () => {
  const connected = await connectDB();
  if (connected) {
    await debugSignupFlow();
  }
  process.exit(0);
})();
