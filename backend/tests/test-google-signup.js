import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';

// Test Google signup flow
const testGoogleSignup = async () => {
  const apiUrl = 'http://localhost:7000/api';
  const testEmail = `testgoogle-${Date.now()}@gmail.com`;
  const testPassword = 'TestPassword@123';

  console.log('\n🧪 Testing Google Signup Flow...');
  console.log('='.repeat(50));
  
  try {
    // Step 1: Simulate Google Token
    console.log('\n1️⃣ Creating fake Google token...');
    const googlePayload = {
      sub: '123456789',
      email: testEmail,
      name: 'Test User Google',
      email_verified: true,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600
    };
    
    // Create fake JWT (without verification - just like what Google sends)
    const fakeGoogleToken = jwt.sign(googlePayload, 'fake-secret', { algorithm: 'HS256' });
    console.log('✅ Token created');

    // Step 2: Call Google Signup endpoint
    console.log('\n2️⃣ Calling /api/auth/google-signup...');
    const signupRes = await fetch(`${apiUrl}/auth/google-signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: fakeGoogleToken })
    });
    
    const signupData = await signupRes.json();
    console.log(`Status: ${signupRes.status}`);
    console.log('Response:', signupData);
    
    if (!signupRes.ok) {
      console.error('❌ Google signup failed');
      return;
    }

    const { email, name } = signupData;
    console.log(`✅ Signup successful! Will show OTP verification for: ${email}`);

    // Step 3: Get OTP from debug endpoint
    console.log('\n3️⃣ Getting OTP from debug endpoint...');
    const debugRes = await fetch(`${apiUrl}/auth/debug-otp/${email}`);
    const debugData = await debugRes.json();
    const otp = debugData.otp;
    console.log(`✅ OTP retrieved: ${otp}`);

    // Step 4: Verify OTP WITHOUT password (this is the key test!)
    console.log('\n4️⃣ Verifying OTP WITHOUT password (Google signup should allow this)...');
    const verifyRes = await fetch(`${apiUrl}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        otp: otp,
        password: '' // Empty password - this should work now!
      })
    });
    
    const verifyData = await verifyRes.json();
    console.log(`Status: ${verifyRes.status}`);
    console.log('Response:', verifyData);

    if (!verifyRes.ok) {
      console.error('❌ OTP verification failed - Google user was not saved to MongoDB!');
      return;
    }

    console.log('\n✅ SUCCESS! User created in MongoDB with Google signup!');
    console.log('Token:', verifyData.token ? '✓ Present' : '✗ Missing');
    console.log('User Data:', verifyData.user);

    // Step 5: Verify user exists in database
    console.log('\n5️⃣ Verifying user exists in MongoDB...');
    const loginRes = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: 'dummy' // We can't login with this since no password was set
      })
    });

    const loginData = await loginRes.json();
    if (loginData.message && loginData.message.includes('registered')) {
      console.log('✅ User found in database!');
    }

  } catch (error) {
    console.error('Test failed:', error.message);
  }
  
  console.log('\n' + '='.repeat(50));
};

testGoogleSignup();
