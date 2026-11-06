// Test helper - Add this to backend/index.js for development testing
// THIS SHOULD ONLY BE USED DURING DEVELOPMENT - REMOVE IN PRODUCTION

// Add this route to backend/index.js (after other auth routes, before the server startup)
// to enable viewing the last OTP sent for testing purposes

/*

// ==================== DEVELOPMENT TESTING ONLY ====================
// This route is for development/testing only. Remove in production!
app.get('/api/auth/test/last-otp', (req, res) => {
  // WARNING: This is a security risk in production!
  // Only enable during development for testing the OTP flow
  // In production, users should receive OTP via email only
  
  res.json({
    warning: 'This endpoint should be removed in production',
    message: 'Check server console for the last OTP sent',
    note: 'OTPs are logged to console during development'
  });
});

// The OTP is logged to server console when sent
// Look for: "OTP sent to email@example.com"

*/

// If you don't want to use Gmail, modify sendOTPEmail function:
/*

// Mock email sending for development (don't use in production)
const sendOTPEmail = async (email, otp) => {
  console.log(`\n========== OTP FOR DEVELOPMENT ==========`);
  console.log(`Email: ${email}`);
  console.log(`OTP: ${otp}`);
  console.log(`Expires in: 10 minutes`);
  console.log(`========================================\n`);
  return true;
};

*/
