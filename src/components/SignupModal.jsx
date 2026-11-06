import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import OTPVerification from './OTPVerification';

function SignupModal({ isOpen, onClose, onSignupSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);

  // Check if Google Client ID is properly configured
  const hasValidGoogleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID && 
    import.meta.env.VITE_GOOGLE_CLIENT_ID !== 'dummy-client-id-for-development';

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      setError('');
      
      // Send token to backend for verification
      const apiBase = import.meta.env.VITE_API_URL || '/api';
      const response = await fetch(`${apiBase}/auth/google-signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token and user info in localStorage
        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userInfo', JSON.stringify(data.user));
          localStorage.setItem('isLoggedIn', 'true');
        }

        // If backend returned a token, user is logged in.
        if (data.token) {
          setFormData({ name: '', email: '', password: '', confirmPassword: '' });
          onSignupSuccess(data.name || data.user?.name, data.email || data.user?.email);
          onClose();
        } else if (data.message && data.message.toLowerCase().includes('otp')) {
          // Backend sent an OTP (new or unverified Google signup) - show OTP modal
          setPendingUser({
            email: data.email || data.email,
            name: data.name || data.name,
            userId: data.userId,
            password: ''
          });
          setShowOTPVerification(true);
        } else {
          // Fallback
          setFormData({ name: '', email: '', password: '', confirmPassword: '' });
          onSignupSuccess(data.name || data.user?.name, data.email || data.user?.email);
          onClose();
        }
      } else {
        setError(data.message || 'Google signup failed');
      }
    } catch (err) {
      console.error('Google signup error:', err);
      setError('Google signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google sign-up failed. Please try again.');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long!');
      return;
    }

    setLoading(true);

    try {
      // Send signup request to backend
      const apiBase = import.meta.env.VITE_API_URL || '/api';
      const response = await fetch(`${apiBase}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Show OTP verification page
        setPendingUser({
          email: formData.email,
          name: formData.name,
          userId: data.userId,
          password: formData.password
        });
        setShowOTPVerification(true);
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerificationSuccess = (user) => {
    setShowOTPVerification(false);
    setPendingUser(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    onSignupSuccess(user.name, user.email);
    onClose();
  };

  if (!isOpen) return null;

  // Show OTP verification if in that step
  if (showOTPVerification && pendingUser) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          <OTPVerification 
            email={pendingUser.email}
            userId={pendingUser.userId}
            password={pendingUser.password}
            onVerificationSuccess={handleOTPVerificationSuccess}
          />
          <div className="text-center p-4">
            <button
              onClick={() => {
                setShowOTPVerification(false);
                setPendingUser(null);
              }}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              Back to Signup
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 flex justify-between items-center rounded-t-lg">
          <h2 className="text-2xl font-bold text-white">Sign Up</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-green-700 p-1 rounded transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
            />
          </div>

          {/* Terms & Conditions */}
          <label className="flex items-center text-sm">
            <input type="checkbox" required className="rounded" />
            <span className="ml-2 text-gray-700">
              I agree to the Terms &{' '}
              <a href="#" className="text-green-600 hover:text-green-700 font-medium">
                Conditions
              </a>
            </span>
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-medium py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>

          {/* Divider */}
          {hasValidGoogleClientId && (
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
          )}

          {/* Google Login Button - Only show if valid Client ID is configured */}
          {hasValidGoogleClientId ? (
            <div className="w-full">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                text="signup_with"
                size="large"
                width="100%"
              />
            </div>
          ) : (
            <div className="w-full p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-800 text-center">
                <strong>Google Sign-up</strong> is not configured yet.
                <br />
                Set your Google Client ID in environment variables to enable it.
              </p>
            </div>
          )}

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="#" className="text-green-600 hover:text-green-700 font-medium">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupModal;
