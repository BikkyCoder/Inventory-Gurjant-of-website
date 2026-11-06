const apiUrl = 'http://localhost:7000/api';
const testEmail = `testuser-${Date.now()}@test.com`;
const testPassword = 'TestPassword123!';

async function testSignupFlow() {
  console.log('\n🔍 Testing Complete Signup & OTP Verification Flow\n');
  console.log('=' .repeat(60));

  try {
    // Step 1: Signup
    console.log('\n📝 STEP 1: SIGNUP');
    console.log('-'.repeat(60));
    
    const signupRes = await fetch(`${apiUrl}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: testEmail,
        password: testPassword,
        confirmPassword: testPassword
      })
    });

    const signupData = await signupRes.json();
    console.log(`✅ Signup Status: ${signupRes.status}`);
    console.log(`   Response:`, signupData);

    if (!signupRes.ok) {
      console.error('❌ Signup failed!');
      return;
    }

    // Step 2: Get OTP
    console.log('\n📧 STEP 2: GET OTP FROM DEBUG ENDPOINT');
    console.log('-'.repeat(60));
    
    const otpRes = await fetch(`${apiUrl}/auth/debug-otp/${testEmail}`);
    const otpData = await otpRes.json();
    
    if (otpRes.status === 404) {
      console.error('❌ ERROR: PendingSignup not found in database!');
      console.log('   This means the signup endpoint did NOT create a PendingSignup record');
      return;
    }
    
    const otp = otpData.otp;
    console.log(`✅ OTP Retrieved: ${otp}`);
    console.log(`   Expiry: ${otpData.otpExpiry}`);

    // Step 3: Verify OTP
    console.log('\n✔️  STEP 3: VERIFY OTP & CREATE USER');
    console.log('-'.repeat(60));
    
    const verifyRes = await fetch(`${apiUrl}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        otp: otp,
        password: testPassword
      })
    });

    const verifyData = await verifyRes.json();
    console.log(`✅ Verify OTP Status: ${verifyRes.status}`);
    console.log(`   Response:`, JSON.stringify(verifyData, null, 2));

    if (!verifyRes.ok) {
      console.error('❌ OTP Verification failed!');
      console.error('   ERROR:', verifyData.message);
      return;
    }

    // Step 4: Try to Login
    console.log('\n🔐 STEP 4: LOGIN WITH SAVED USER');
    console.log('-'.repeat(60));
    
    const loginRes = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword
      })
    });

    const loginData = await loginRes.json();
    console.log(`✅ Login Status: ${loginRes.status}`);
    console.log(`   Response:`, JSON.stringify(loginData, null, 2));

    if (loginRes.ok) {
      console.log('\n🎉 SUCCESS! User was properly saved and can login!');
    } else {
      console.error('❌ Login failed - User may not have been saved properly');
    }

  } catch (error) {
    console.error('❌ Test Error:', error.message);
    console.error('   Stack:', error.stack);
  }
}

// Run the test
testSignupFlow().then(() => {
  console.log('\n' + '='.repeat(60));
  console.log('✅ Test completed\n');
  process.exit(0);
}).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
