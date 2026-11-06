import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const OTPContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const OTPCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 25px 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 10px;
  font-size: 28px;
`;

const Subtitle = styled.p`
  color: #666;
  text-align: center;
  margin-bottom: 30px;
  font-size: 14px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  color: #333;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 14px;
`;

const OTPInputContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  justify-content: center;
`;

const OTPInput = styled.input`
  width: 50px;
  height: 50px;
  font-size: 24px;
  text-align: center;
  color: #111; 
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:invalid {
    border-color: #ff6b6b;
  }
`;

const PasswordInput = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  @media (max-width: 700px) {
    font-size: 14px;
    padding: 10px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const ResendText = styled.p`
  text-align: center;
  color: #666;
  font-size: 14px;
  margin-top: 15px;

  button {
    background: none;
    border: none;
    color: #667eea;
    cursor: pointer;
    font-weight: 600;
    text-decoration: underline;

    &:hover {
      color: #764ba2;
    }

    &:disabled {
      color: #ccc;
      cursor: not-allowed;
    }
  }
`;

const ErrorMessage = styled.div`
  background-color: #ffe0e0;
  color: #c92a2a;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 15px;
  font-size: 14px;
  border: 1px solid #ff8787;
`;

const SuccessMessage = styled.div`
  background-color: #d3f9d8;
  color: #2b8a3e;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 15px;
  font-size: 14px;
  border: 1px solid #51cf66;
`;

const TimerText = styled.p`
  text-align: center;
  color: #667eea;
  font-size: 14px;
  font-weight: 600;
`;

const OTPVerification = ({ email, userId, password, onVerificationSuccess }) => {
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [canResend, setCanResend] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOTPChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOTPKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleOTPPaste = (e) => {
    e.preventDefault();
    
    // Get pasted text from clipboard
    const pastedText = e.clipboardData.getData('text').trim();
    
    // Extract only digits
    const digits = pastedText.replace(/\D/g, '').slice(0, 6).split('');
    
    // Fill OTP array with the pasted digits
    const newOTP = ['', '', '', '', '', ''];
    digits.forEach((digit, index) => {
      if (index < 6) {
        newOTP[index] = digit;
      }
    });
    
    setOTP(newOTP);
    
    // Auto-focus: if all 6 digits pasted, stay on last field; otherwise focus on next empty field
    setTimeout(() => {
      const focusIndex = digits.length >= 6 ? 5 : Math.min(digits.length, 5);
      const nextInput = document.getElementById(`otp-${focusIndex}`);
      if (nextInput) nextInput.focus();
    }, 0);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    console.log('✅ Form submitted - handleVerifyOTP triggered');
    setError('');
    setSuccess('');

    const otpValue = otp.join('');

    console.log('handleVerifyOTP called with:', { email, otpValue, passwordProvided: !!password });

    if (otpValue.length !== 6) {
      setError('Please enter all 6 digits of the OTP');
      return;
    }

    // If user didn't provide a password previously (e.g. Google signup), allow them to optionally set one now
    // But password is not required for Google signups
    if ((!password || password.trim() === '')) {
      // If user started entering a new password, validate it
      if (newPassword && newPassword.trim() !== '') {
        if (newPassword.length < 6) {
          setError('Password must be at least 6 characters long');
          setLoading(false);
          return;
        }
        if (newPassword !== confirmNewPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
      }
      // If no password provided and no new password, that's OK for Google signups
    }

    setLoading(true);
    // Use VITE_API_URL or fallback to relative /api
    const apiUrl = import.meta.env.VITE_API_URL || '/api';

    try {
      // Normalize email
      const normalizedEmail = email.toLowerCase().trim();
      
      console.log('Verifying OTP:', {
        email: normalizedEmail,
        otp: otpValue,
        apiUrl: `${apiUrl}/auth/verify-otp`,
        passwordProvided: !!password
      });
      
      console.log('Sending OTP verification request:', {
        email: normalizedEmail,
        otp: otpValue,
        passwordProvided: !!password,
        url: `${apiUrl}/auth/verify-otp`
      });
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${apiUrl}/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: normalizedEmail,
          otp: otpValue,
          password: password && password.trim() !== '' ? password : (newPassword || ''), // send newPassword if provided
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log('Fetch response received:', { 
        status: response.status, 
        statusText: response.statusText,
        contentType: response.headers.get('content-type')
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonErr) {
        console.error('Failed to parse response as JSON:', jsonErr);
        console.error('Response text:', await response.text());
        setError('Invalid response from server. Please try again.');
        setLoading(false);
        return;
      }
      
      console.log('OTP response:', { status: response.status, data, passwordSent: !!password });

      if (response.ok) {
        setSuccess('Email verified successfully!');
        if (data.token) {
          localStorage.setItem('token', data.token);
          console.log('[OTP] Token saved to localStorage');
        }
        if (data.user) {
          localStorage.setItem('userInfo', JSON.stringify(data.user));
          console.log('[OTP] User info saved to localStorage', data.user);
        }

        setTimeout(() => {
          if (onVerificationSuccess) {
            console.log('[OTP] Calling onVerificationSuccess callback');
            onVerificationSuccess(data.user);
          }
        }, 1500);
      } else {
        const errorMsg = data.message || 'OTP verification failed';
        console.error('[OTP] Verification failed:', errorMsg, 'Status:', response.status);
        setError(errorMsg);
      }
    } catch (err) {
      console.error('OTP verification error:', err);
      let errorMessage = `Error verifying OTP: ${err.message}`;
      
      if (err.name === 'AbortError') {
        errorMessage = 'Request timeout - Backend not responding. Please check if server is running.';
      } else if (err.message.includes('fetch')) {
        errorMessage = 'Network error - Failed to connect to server. Please check backend is running on port 7000.';
      }
      
      console.error('Error details:', {
        message: err.message,
        name: err.name,
        stack: err.stack,
        apiUrl: `${apiUrl}/auth/verify-otp`
      });
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setError('');

    try {
      // Use VITE_API_URL or fallback to relative /api
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      
      const response = await fetch(`${apiUrl}/auth/resend-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      console.log('Resend OTP response:', { status: response.status, statusText: response.statusText });

      const data = await response.json();

      if (response.ok) {
        setSuccess('OTP resent to your email');
        setTimeLeft(600);
        setCanResend(false);
        setOTP(['', '', '', '', '', '']);
      } else {
        setError(data.message || 'Failed to resend OTP');
      }
    } catch (err) {
      console.error('Resend OTP error:', err);
      setError(`Error resending OTP: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    // <OTPContainer>
      <OTPCard>
        <Title>Verify Your Email</Title>
        <Subtitle>We sent a 6-digit code to {email}</Subtitle>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <form onSubmit={handleVerifyOTP}>
          <FormGroup>
            <Label>Enter OTP Code</Label>
            <OTPInputContainer>
              {otp.map((digit, index) => (
                <OTPInput
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  onKeyDown={(e) => handleOTPKeyDown(index, e)}
                  onPaste={handleOTPPaste}
                  disabled={loading}
                  inputMode="numeric"
                />
              ))}
            </OTPInputContainer>
          </FormGroup>

          {/* If user didn't provide a password at signup (e.g. Google), allow them to set one now */}
          {(!password || password.trim() === '') && (
            <FormGroup>
              <Label>Set a Password <span style={{ color: '#999', fontWeight: 'normal' }}>(Optional)</span></Label>
              <PasswordInput
                type="password"
                placeholder="Enter a new password (min 6 chars, or skip)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading}
              />
              <div style={{ height: 8 }} />
              <PasswordInput
                type="password"
                placeholder="Confirm new password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                disabled={loading}
              />
              <div style={{ height: 6, fontSize: '12px', color: '#999' }}>
                💡 You can set a password now or add one later in your profile settings
              </div>
            </FormGroup>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify Email'}
          </Button>
        </form>

        <TimerText>OTP expires in {formatTime(timeLeft)}</TimerText>

        <ResendText>
          Didn't receive the code?{' '}
          <button onClick={handleResendOTP} disabled={!canResend || loading}>
            Resend
          </button>
        </ResendText>
      </OTPCard>
    // </OTPContainer>
  );
};

export default OTPVerification;
