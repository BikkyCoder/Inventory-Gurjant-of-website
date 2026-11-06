/**
 * COMPREHENSIVE GUIDE FOR USER SIGNUP/LOGIN/SAVE TO MONGODB
 * 
 * This document explains the correct flow for saving users to MongoDB
 */

console.log(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                    USER SIGNUP/LOGIN FLOW GUIDE                              ║
╚══════════════════════════════════════════════════════════════════════════════╝

📌 IMPORTANT: There are 2 ways users get saved to MongoDB:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
METHOD 1: SIGNUP → OTP VERIFICATION → LOGIN (RECOMMENDED FOR PRODUCTION)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 1: User Clicks "Sign Up"
  └─ Frontend sends: POST /api/auth/signup
     Body: { name, email, password, confirmPassword }
     Response: OTP sent to email, user in PENDING SIGNUPS collection
  
STEP 2: User Enters OTP
  └─ Frontend sends: POST /api/auth/verify-otp
     Body: { email, otp, password }
     Response: User MOVED to USERS collection ✅
     Database: User is NOW SAVED! 
  
STEP 3: User Logs In
  └─ Frontend sends: POST /api/auth/login
     Body: { email, password }
     Response: JWT token, user can access app ✅
     Database: No change, user already exists

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
METHOD 2: GOOGLE SIGNUP → OTP VERIFICATION → AUTO LOGIN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 1: User Clicks "Sign Up with Google"
  └─ Frontend sends: POST /api/auth/google-signup
     Body: { token: googleJWT }
     Response: OTP sent to email, user in PENDING SIGNUPS collection
  
STEP 2: User Enters OTP
  └─ Frontend sends: POST /api/auth/verify-otp
     Body: { email, otp, password: optional }
     Response: User MOVED to USERS collection ✅
     Database: User is NOW SAVED!
  
STEP 3: User is Auto-Logged In
  └─ JWT token returned, access granted ✅
     Database: No change, user already exists

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  COMMON MISTAKES TO AVOID:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ MISTAKE 1: Trying to login without signup first
   → User will NOT be in database
   → Login will fail with "User not found"
   → SOLUTION: User must signup first!

❌ MISTAKE 2: Signup without verifying OTP
   → User remains in PENDING SIGNUPS
   → User is NOT in main USERS collection
   → User cannot login
   → SOLUTION: Must verify OTP to be saved as User!

❌ MISTAKE 3: Wrong API URL in frontend
   → Frontend calls wrong backend server
   → Users saved to wrong database
   → SOLUTION: Check VITE_API_URL in frontend/.env
   → Must be: http://localhost:7000/api (for development)

❌ MISTAKE 4: Wrong database name
   → Users saved to wrong MongoDB database
   → Cannot see users in MongoDB Compass
   → SOLUTION: Check MONGO_URI in backend/.env
   → Must be: mongodb://127.0.0.1:27017/ui_components

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ TEST CHECKLIST:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. ✅ Backend is running: http://localhost:7000
   Command: npm start (in backend folder)

2. ✅ Frontend is running: http://localhost:7002 (or 5173)
   Command: npm run dev (in frontend folder)

3. ✅ MongoDB is running: mongodb://127.0.0.1:27017
   Command: mongod (or check with MongoDB Compass)

4. ✅ Test Signup:
   - Go to frontend
   - Click "Sign Up"
   - Enter: name, email (real Gmail), password
   - Check MongoDB: User should appear in "pendingsignups" collection

5. ✅ Test OTP Verification:
   - Copy OTP from your email (or use backend /api/auth/debug-otp/email endpoint)
   - Enter OTP in frontend
   - Check MongoDB: User should move to "users" collection ✅

6. ✅ Test Login:
   - Use email/password from step 4
   - Should get JWT token
   - User should be able to access app

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 DEBUG ENDPOINTS (Development Only):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Check OTP for email:
  GET /api/auth/debug-otp/your-email@gmail.com
  
Get user details:
  GET /api/auth/debug-user/your-email@gmail.com

Check all database:
  node tests/debug-signup-flow.js

Reset user (delete):
  POST /api/auth/test-reset/your-email@gmail.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Need help? Check:
  1. Backend console logs for errors
  2. Frontend console (F12) for network errors  
  3. MongoDB Compass for data saved
  4. Run: node tests/debug-signup-flow.js for database status

`);
