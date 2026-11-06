import React, { useState } from 'react';
import OTPVerification from './OTPVerification';

function LoginModal({ isOpen, onClose, onLoginSuccess, onSignupClick }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); 
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);
  const [verifyingAccount, setVerifyingAccount] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotOTP, setForgotOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [forgotStep, setForgotStep] = useState('email');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL || '/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('[LOGIN] Attempting login with email:', email);

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      let data = null;
      try {
        data = await response.json();
      } catch (parseErr) {
        console.error('[LOGIN] Failed to parse JSON response', parseErr);
        setError('Server returned an unexpected response. Please try again.');
        setLoading(false);
        return;
      }

      if (!response.ok) {
        console.error('[LOGIN ERROR] Login failed with status', response.status, 'Message:', data?.message);
        setError(data?.message || 'Login failed. Please try again.');
        setLoading(false);
        return;
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userInfo', JSON.stringify(data.user));
        localStorage.setItem('isLoggedIn', 'true');
      }

      console.log('[LOGIN SUCCESS] User logged in:', data.user);
      setLoading(false);
      alert('Login successful!');
      onLoginSuccess(data.user.email);
      setEmail('');
      setPassword('');
      onClose();
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please check your credentials and try again.');
      setLoading(false);
    }
  };

  const handleVerifyAccount = async () => {
    setVerifyingAccount(true);
    setError('');

    try {
      const response = await fetch(`${apiUrl}/auth/verify-account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('✓ Account verified successfully! Now try logging in with your password.');
        setError('');
        setVerifyingAccount(false);
      } else {
        setError(data?.message || 'Failed to verify account');
        setVerifyingAccount(false);
      }
    } catch (err) {
      console.error('Verify account error:', err);
      setError('Error verifying account. Please try again.');
      setVerifyingAccount(false);
    }
  };

  const handleForgotPasswordRequest = async (e) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotError('');
    setForgotSuccess('');

    try {
      const response = await fetch(`${apiUrl}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: forgotEmail }),
      });

      const data = await response.json();

      if (response.ok) {
        setForgotSuccess('✓ OTP sent to your email!');
        setForgotStep('otp');
      } else {
        setForgotError(data?.message || 'Failed to send OTP');
      }
    } catch (err) {
      console.error('Forgot password error:', err);
      setForgotError('Error requesting password reset');
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setForgotLoading(true);
    setForgotError('');
    setForgotSuccess('');

    if (newPassword !== confirmPassword) {
      setForgotError('Passwords do not match');
      setForgotLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setForgotError('Password must be at least 6 characters');
      setForgotLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: forgotEmail,
          otp: forgotOTP,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setForgotSuccess('✓ Password reset successfully! You can now login.');
        setTimeout(() => {
          setShowForgotPassword(false);
          setForgotStep('email');
          setForgotEmail('');
          setForgotOTP('');
          setNewPassword('');
          setConfirmPassword('');
          setForgotSuccess('');
          setEmail(forgotEmail);
        }, 2000);
      } else {
        setForgotError(data?.message || 'Failed to reset password');
      }
    } catch (err) {
      console.error('Reset password error:', err);
      setForgotError('Error resetting password');
    } finally {
      setForgotLoading(false);
    }
  };

  if (!isOpen) return null;

  if (showForgotPassword) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center rounded-t-lg">
            <h2 className="text-2xl font-bold text-white">Reset Password</h2>
            <button
              onClick={() => {
                setShowForgotPassword(false);
                setForgotStep('email');
                setForgotError('');
                setForgotSuccess('');
              }}
              className="text-white hover:bg-blue-700 p-1 rounded transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={forgotStep === 'email' ? handleForgotPasswordRequest : handleResetPassword} className="p-6 space-y-4">
            {forgotError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                {forgotError}
              </div>
            )}
            {forgotSuccess && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded text-sm">
                {forgotSuccess}
              </div>
            )}

            {forgotStep === 'email' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    disabled={forgotLoading}
                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {forgotLoading ? 'Sending OTP...' : 'Send OTP'}
                </button>
              </>
            )}

            {forgotStep === 'otp' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    value={forgotOTP}
                    onChange={(e) => setForgotOTP(e.target.value)}
                    placeholder="123456"
                    maxLength="6"
                    disabled={forgotLoading}
                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    disabled={forgotLoading}
                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input  
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    disabled={forgotLoading}
                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent disabled:opacity-50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {forgotLoading ? 'Resetting...' : 'Reset Password'}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 flex justify-between items-center rounded-t-lg">
          <h2 className="text-2xl font-bold text-white">Login</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-purple-700 p-1 rounded transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              <p>{error}</p>
              {error.includes('Please verify your email') && (
                <button
                  type="button"
                  onClick={handleVerifyAccount}
                  disabled={verifyingAccount}
                  className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded transition disabled:opacity-50"
                >
                  {verifyingAccount ? 'Verifying...' : '✓ Verify Account'}
                </button>
              )}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="rounded" />
              <span className="ml-2 text-gray-700">Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => {
                setShowForgotPassword(true);
                setForgotEmail(email);
              }}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium py-2 rounded-lg hover:from-purple-700 hover:to-purple-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                onSignupClick?.();
              }}
              className="text-purple-600 hover:text-purple-700 font-medium">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
