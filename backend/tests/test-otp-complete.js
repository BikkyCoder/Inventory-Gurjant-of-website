import mongoose from 'mongoose';
import { User } from './models/UserModel.js';

const MONGO_URI = 'mongodb://127.0.0.1:27017/ui_componts';

async function testOTPFlow() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Connected to MongoDB');

    // Test 1: Create a user with OTP (simulating signup)
    console.log('\n=== TEST 1: Creating user with OTP (simulating signup) ===');
    const testEmail = 'test@example.com';
    const testPassword = 'testPassword123';
    const testOTP = '123456';
    
    const user = new User({
      name: 'Test User',
      email: testEmail,
      password: null, // Not saved yet, will be saved after OTP verification
      otp: testOTP,
      otpExpiry: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
      isVerified: false
    });

    await user.save();
    console.log('✅ User created with OTP:', {
      email: user.email,
      otp: user.otp,
      password: user.password,
      isVerified: user.isVerified
    });

    // Test 2: Verify OTP and save password (simulating OTP verification)
    console.log('\n=== TEST 2: Verifying OTP and saving password ===');
    const userFound = await User.findOne({ email: testEmail });
    
    if (!userFound) {
      console.error('❌ User not found!');
      process.exit(1);
    }

    // Check OTP
    if (userFound.otp !== testOTP) {
      console.error('❌ OTP mismatch!');
      console.error('DB OTP:', userFound.otp);
      console.error('Provided OTP:', testOTP);
      process.exit(1);
    }

    console.log('✅ OTP verified:', userFound.otp);

    // Check OTP expiry
    if (new Date() > userFound.otpExpiry) {
      console.error('❌ OTP expired!');
      process.exit(1);
    }

    console.log('✅ OTP not expired');

    // Hash and save password
    import('bcryptjs').then(async (bcryptModule) => {
      const bcrypt = bcryptModule.default;
      
      userFound.password = await bcrypt.hash(testPassword, 10);
      userFound.isVerified = true;
      userFound.otp = null;
      userFound.otpExpiry = null;

      await userFound.save();
      
      console.log('✅ User after OTP verification:', {
        email: userFound.email,
        passwordHash: userFound.password ? '✅ SAVED (hashed)' : '❌ NOT SAVED',
        otp: userFound.otp || 'CLEARED',
        isVerified: userFound.isVerified
      });

      // Test 3: Verify password was actually saved
      console.log('\n=== TEST 3: Verify password was saved in database ===');
      const userFromDB = await User.findOne({ email: testEmail });
      
      if (!userFromDB.password) {
        console.error('❌ Password NOT saved!');
        process.exit(1);
      }

      console.log('✅ Password saved successfully');
      
      // Test password comparison
      const isPasswordValid = await bcrypt.compare(testPassword, userFromDB.password);
      if (!isPasswordValid) {
        console.error('❌ Password hash mismatch!');
        process.exit(1);
      }

      console.log('✅ Password comparison successful');

      console.log('\n=== ALL TESTS PASSED ===');
      console.log('Final user state:', {
        email: userFromDB.email,
        name: userFromDB.name,
        isVerified: userFromDB.isVerified,
        hasPassword: !!userFromDB.password,
        otp: userFromDB.otp,
        otpExpiry: userFromDB.otpExpiry
      });

      await mongoose.connection.close();
      process.exit(0);
    });

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

testOTPFlow();
