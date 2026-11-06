import axios from 'axios';

/**
 * Complete Signup → OTP Verification → Login Test
 * This script simulates the entire user creation and login flow
 */

const API_BASE = 'http://localhost:7000/api';

// Generate random email for testing
const generateTestEmail = () => {
  return `testuser-${Date.now()}@gmail.com`;
};

const log = {
  step: (n, title) => console.log(`\n${'═'.repeat(70)}\n📍 STEP ${n}: ${title}\n${'═'.repeat(70)}`),
  success: (msg) => console.log(`✅ ${msg}`),
  error: (msg) => console.log(`❌ ${msg}`),
  info: (msg) => console.log(`ℹ️  ${msg}`),
  data: (label, data) => console.log(`\n${label}:\n`, JSON.stringify(data, null, 2))
};

const testCompleteFlow = async () => {
  try {
    const testEmail = generateTestEmail();
    const testPassword = 'Test@123456';
    const testName = 'Test User ' + Date.now();

    log.step(1, 'SIGNUP - Create Account');
    log.info(`Email: ${testEmail}`);
    log.info(`Password: ${testPassword}`);
    log.info(`Name: ${testName}`);

    const signupResponse = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: testName,
        email: testEmail,
        password: testPassword,
        confirmPassword: testPassword
      })
    });

    const signupData = await signupResponse.json();
    
    if (!signupResponse.ok) {
      log.error(`Signup failed: ${signupData.message}`);
      return;
    }

    log.success('Signup successful!');
    log.data('Response', signupData);

    // ─────────────────────────────────────────────────────────────
    log.step(2, 'GET OTP - Retrieve OTP from Backend');
    log.info(`Getting OTP for: ${testEmail}`);

    const otpResponse = await fetch(`${API_BASE}/auth/debug-otp/${testEmail}`);
    const otpData = await otpResponse.json();

    if (!otpResponse.ok) {
      log.error(`Failed to get OTP: ${otpData.message}`);
      return;
    }

    const otp = otpData.otp;
    log.success(`OTP retrieved: ${otp}`);
    log.data('OTP Details', otpData);

    // ─────────────────────────────────────────────────────────────
    log.step(3, 'VERIFY OTP - Save User to Database');
    log.info(`Email: ${testEmail}`);
    log.info(`OTP: ${otp}`);
    log.info(`Password: ${testPassword}`);

    const verifyResponse = await fetch(`${API_BASE}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        otp: otp,
        password: testPassword
      })
    });

    const verifyData = await verifyResponse.json();

    if (!verifyResponse.ok) {
      log.error(`OTP verification failed: ${verifyData.message}`);
      return;
    }

    log.success('OTP verified successfully!');
    log.data('Response', verifyData);

    const jwtToken = verifyData.token;
    log.success(`JWT Token received: ${jwtToken.substring(0, 50)}...`);

    // ─────────────────────────────────────────────────────────────
    log.step(4, 'LOGIN - Authenticate User');
    log.info(`Email: ${testEmail}`);
    log.info(`Password: ${testPassword}`);

    const loginResponse = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        password: testPassword
      })
    });

    const loginData = await loginResponse.json();

    if (!loginResponse.ok) {
      log.error(`Login failed: ${loginData.message}`);
      return;
    }

    log.success('Login successful!');
    log.data('Response', loginData);

    // ─────────────────────────────────────────────────────────────
    log.step(5, 'VERIFY USER IN DATABASE');
    log.info(`Checking if user was saved to MongoDB...`);

    const debugResponse = await fetch(`${API_BASE}/auth/debug-user/${testEmail}`);
    const debugData = await debugResponse.json();

    if (!debugResponse.ok) {
      log.error(`User not found in database!`);
      return;
    }

    log.success('User found in database!');
    log.data('User Data in MongoDB', debugData);

    // ─────────────────────────────────────────────────────────────
    console.log(`\n${'═'.repeat(70)}`);
    console.log(`\n✅ ✅ ✅  COMPLETE FLOW TEST SUCCESSFUL! ✅ ✅ ✅\n`);
    console.log(`Summary:`);
    console.log(`  1. ✅ Signup created PendingSignup`);
    console.log(`  2. ✅ OTP retrieved successfully`);
    console.log(`  3. ✅ OTP verification created User in Database`);
    console.log(`  4. ✅ Login authenticated with correct password`);
    console.log(`  5. ✅ User verified in MongoDB`);
    console.log(`\n📧 Test Email: ${testEmail}`);
    console.log(`🔐 Test Password: ${testPassword}`);
    console.log(`\nYour system is working correctly! ✅\n`);
    console.log(`${'═'.repeat(70)}\n`);

  } catch (error) {
    log.error(`Test failed with error: ${error.message}`);
    console.error(error);
  }
};

console.log(`\n${'═'.repeat(70)}`);
console.log(`🧪 STARTING COMPLETE SIGNUP → OTP → LOGIN → VERIFY TEST`);
console.log(`${'═'.repeat(70)}`);
console.log(`API Base: ${API_BASE}`);
console.log(`⏰ Started at: ${new Date().toLocaleString()}`);

testCompleteFlow().then(() => {
  console.log(`⏰ Finished at: ${new Date().toLocaleString()}\n`);
  process.exit(0);
});
