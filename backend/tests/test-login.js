#!/usr/bin/env node

const EMAIL = 'gurjantsingha064@gmail.com';
const PASSWORD = '123123';
const API_URL = 'http://127.0.0.1:7000/api';

async function testLogin() {
  try {
    console.log('\n🔐 Testing Login...');
    console.log(`Email: ${EMAIL}`);
    console.log(`Password: ${PASSWORD}\n`);

    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
    });

    const data = await response.json();

    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log('Response:', JSON.stringify(data, null, 2));

    if (response.ok) {
      console.log('\n✅ LOGIN SUCCESSFUL!');
      console.log('Token:', data.token ? `${data.token.substring(0, 20)}...` : 'N/A');
      console.log('User:', data.user);
    } else {
      console.log('\n❌ LOGIN FAILED!');
    }
  } catch (error) {
    console.error('\n❌ Error:', error.message);
  }
}

testLogin();
