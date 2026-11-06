import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from './models/UserModel.js';

const MONGODB_URI = 'mongodb://127.0.0.1:27017/ui_componts';

async function debug() {
  try {
    console.log('\n🔍 DETAILED LOGIN DEBUG DIAGNOSTIC\n');
    console.log('Connecting to MongoDB:', MONGODB_URI);
    
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB\n');

    // Find the test user
    const testEmail = 'gurjantsingha064@gmail.com';
    const testPassword = '123456'; // The password the user claims they're using
    
    console.log(`📧 Looking for user: ${testEmail}`);
    const user = await User.findOne({ email: testEmail.toLowerCase().trim() });

    if (!user) {
      console.log('❌ User not found in database');
      process.exit(1);
    }

    console.log('✅ User found\n');

    console.log('📋 User Details:');
    console.log('   Email:', user.email);
    console.log('   Name:', user.name);
    console.log('   isVerified:', user.isVerified);
    console.log('   Password field exists:', !!user.password);
    
    if (user.password) {
      console.log('   Stored password hash:', user.password);
      console.log('   Hash length:', user.password.length);
      console.log('   Hash format: $2a$10$ prefix?', user.password.startsWith('$2a$10$'));
    } else {
      console.log('   ❌ NO PASSWORD HASH STORED!');
      process.exit(1);
    }

    console.log('\n🔐 PASSWORD COMPARISON TEST\n');
    
    console.log(`Input password: "${testPassword}"`);
    console.log(`Input password length: ${testPassword.length}`);
    console.log(`Input password type: ${typeof testPassword}`);
    
    console.log(`\nStored hash: ${user.password}`);
    console.log(`Stored hash length: ${user.password.length}`);
    console.log(`Stored hash type: ${typeof user.password}`);

    // Test 1: Direct bcrypt.compare
    console.log('\n⚙️  Running bcrypt.compare()...');
    try {
      const isMatch = await bcrypt.compare(testPassword, user.password);
      console.log(`✅ bcrypt.compare() result: ${isMatch}`);
      
      if (!isMatch) {
        console.log('\n❌ PASSWORD MISMATCH!');
        console.log('The stored hash does not match the input password');
        console.log('\nThis could mean:');
        console.log('1. User is entering wrong password');
        console.log('2. Password was hashed differently during signup');
        console.log('3. Password field got corrupted');
      }
    } catch (bcErr) {
      console.log('❌ bcrypt.compare() threw error:', bcErr.message);
    }

    // Test 2: Try with different variations
    console.log('\n🧪 Testing password variations:\n');
    
    const testVariations = [
      testPassword,
      testPassword.trim(),
      testPassword.toLowerCase(),
      '123456',
      '123456 ',
      ' 123456',
    ];

    for (const variant of testVariations) {
      try {
        const result = await bcrypt.compare(variant, user.password);
        console.log(`"${variant}" => ${result}`);
      } catch (e) {
        console.log(`"${variant}" => ERROR: ${e.message}`);
      }
    }

    console.log('\n📊 HASH ANALYSIS\n');
    console.log('Hash breakdown:');
    const parts = user.password.split('$');
    console.log('   Algorithm: $' + parts[1] + '$ (bcrypt)');
    console.log('   Cost: ' + parts[2] + ' (2^10 = 1024 rounds, standard)');
    console.log('   Salt: ' + parts[3]);
    console.log('   Checksum: ' + parts[4]);

    // Test 3: Try hashing the test password and comparing
    console.log('\n🔄 Testing hash generation:\n');
    const freshHash = await bcrypt.hash(testPassword, 10);
    console.log('Fresh hash of "123456": ' + freshHash);
    const compareWithFresh = await bcrypt.compare(testPassword, freshHash);
    console.log('bcrypt.compare("123456", freshHash):', compareWithFresh);

    console.log('\n✅ Diagnostic complete!');
    console.log('\nSUMMARY:');
    if (user.password && await bcrypt.compare(testPassword, user.password)) {
      console.log('✅ User has valid password hash');
      console.log('✅ Password "123456" matches the stored hash');
      console.log('⚠️  If login is still failing, the issue is NOT password');
    } else {
      console.log('❌ Password mismatch - user may be entering wrong password');
      console.log('❌ OR password was stored incorrectly during signup');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

debug();
