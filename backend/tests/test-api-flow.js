import dotenv from 'dotenv';

dotenv.config();

async function testFullSignupAndOTPFlow() {
  const apiUrl = 'http://localhost:5000/api';
  const testUser = {
    name: 'Full Test User',
    email: 'fulltest@example.com',
    password: 'testPassword123',
    confirmPassword: 'testPassword123'
  };

  try {
    console.log('=== STEP 1: Signup (Generate OTP) ===');
    const signupRes = await fetch(`${apiUrl}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testUser)
    });

    const signupData = await signupRes.json();
    console.log('Status:', signupRes.status);
    console.log('Response:', signupData);

    if (!signupRes.ok) {
      console.error('❌ Signup failed');
      return;
    }

    const { email, userId } = signupData;
    console.log('✅ Signup successful. OTP sent to:', email);

    // Get OTP from database for testing
    console.log('\n=== STEP 2: Fetch OTP from database ===');
    const getOTPRes = await fetch(`${apiUrl}/auth/debug-otp/${email}`);
    const otpData = await getOTPRes.json();
    
    if (!getOTPRes.ok || !otpData.otp) {
      console.error('❌ Failed to get OTP:', otpData);
      return;
    }

    const otp = otpData.otp;
    console.log('✅ OTP retrieved:', otp);

    // Verify OTP
    console.log('\n=== STEP 3: Verify OTP ===');
    const verifyRes = await fetch(`${apiUrl}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        otp,
        password: testUser.password
      })
    });

    const verifyData = await verifyRes.json();
    console.log('Status:', verifyRes.status);
    console.log('Response:', JSON.stringify(verifyData, null, 2));

    if (!verifyRes.ok) {
      console.error('❌ OTP verification failed');
      return;
    }

    console.log('✅ OTP verified successfully!');
    console.log('✅ Token received:', verifyData.token ? 'YES' : 'NO');
    console.log('✅ User verified:', verifyData.user?.isVerified ? 'YES' : 'NO');

    // Verify password was saved
    console.log('\n=== STEP 4: Verify password was saved ===');
    const checkDBRes = await fetch(`${apiUrl}/auth/debug-otp/${email}`);
    const userDBData = await checkDBRes.json();
    
    console.log('User state in DB:', {
      email: userDBData.email,
      hasPassword: !!userDBData.password,
      passwordStatus: userDBData.password ? '✅ SAVED' : '❌ NOT SAVED',
      isVerified: userDBData.isVerified,
      otp: userDBData.otp || 'CLEARED'
    });

    if (!userDBData.password) {
      console.error('❌ Password was NOT saved!');
    } else {
      console.log('✅ Password was successfully saved!');
    }

    console.log('\n=== ALL STEPS COMPLETED ===');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testFullSignupAndOTPFlow();
