import jwt from 'jsonwebtoken';

const apiUrl = 'http://localhost:7000/api';

async function testGoogleSignupFlow() {
  const testEmail = `testgoogle-${Date.now()}@gmail.com`;

  console.log('\n🔍 Testing Google Signup Flow\n');
  console.log('=' .repeat(60));

  try {
    // Step 1: Create fake Google token
    console.log('\n🔐 STEP 1: CREATE GOOGLE TOKEN');
    console.log('-'.repeat(60));
    
    const googlePayload = {
      sub: '123456789',
      email: testEmail,
      name: 'Test Google User',
      email_verified: true,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 3600
    };
    
    const fakeGoogleToken = jwt.sign(googlePayload, 'fake-secret', { algorithm: 'HS256' });
    console.log('✅ Fake Google token created');

    // Step 2: Google Signup
    console.log('\n🌐 STEP 2: GOOGLE SIGNUP');
    console.log('-'.repeat(60));
    
    const signupRes = await fetch(`${apiUrl}/auth/google-signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: fakeGoogleToken })
    });

    const signupData = await signupRes.json();
    console.log(`✅ Google Signup Status: ${signupRes.status}`);
    console.log(`   Email: ${signupData.email}`);
    console.log(`   Name: ${signupData.name}`);

    if (!signupRes.ok) {
      console.error('❌ Google signup failed!');
      return;
    }

    // Step 3: Get OTP
    console.log('\n📧 STEP 3: GET OTP');
    console.log('-'.repeat(60));
    
    const otpRes = await fetch(`${apiUrl}/auth/debug-otp/${testEmail}`);
    const otpData = await otpRes.json();
    
    if (!otpRes.ok) {
      console.error('❌ Failed to get OTP:', otpData);
      return;
    }
    
    const otp = otpData.otp;
    console.log(`✅ OTP Retrieved: ${otp}`);
    console.log(`   Source: ${otpData.source}`);

    // Step 4: Verify OTP WITHOUT password (Google users don't need password)
    console.log('\n✔️  STEP 4: VERIFY OTP (WITHOUT PASSWORD)');
    console.log('-'.repeat(60));
    
    const verifyRes = await fetch(`${apiUrl}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        otp: otp,
        password: '' // Google signup doesn't require password
      })
    });

    const verifyData = await verifyRes.json();
    console.log(`✅ Verify OTP Status: ${verifyRes.status}`);

    if (!verifyRes.ok) {
      console.error('❌ OTP Verification failed!');
      console.error('   ERROR:', verifyData.message);
      return;
    }

    console.log(`✅ User saved with token`);
    console.log(`   User: ${verifyData.user.name}`);
    console.log(`   Verified: ${verifyData.user.isVerified}`);

    console.log('\n🎉 SUCCESS! Google user was properly saved and verified!');

  } catch (error) {
    console.error('❌ Test Error:', error.message);
  }
}

// Run the test
testGoogleSignupFlow().then(() => {
  console.log('\n' + '='.repeat(60));
  console.log('✅ Test completed\n');
  process.exit(0);
}).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
