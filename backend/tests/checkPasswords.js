import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const mongo_uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ui_componts';

mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('✓ Connected to MongoDB');
    
    const userSchema = new mongoose.Schema({
      email: String,
      password: String,
      isVerified: Boolean
    });
    
    const User = mongoose.model('User', userSchema, 'users');
    
    const users = await User.find({});
    
    console.log('\n📊 Total users:', users.length);
    console.log('================================\n');
    
    for (const user of users) {
      console.log('📧 Email:', user.email);
      console.log('🔒 Password stored:', user.password ? user.password.substring(0, 30) + '...' : 'NONE');
      console.log('✓ Verified:', user.isVerified);
      console.log('📏 Length:', user.password ? user.password.length : 0);
      
      const isHash = user.password && user.password.startsWith('$2');
      console.log('🔍 Is bcrypt hash?', isHash ? 'YES ✓' : 'NO ❌');
      
      // Try to test password
      if (user.password && user.password.length > 20) {
        try {
          const testMatch = await bcrypt.compare('testpass', user.password);
          console.log('💬 Can compare:', 'YES');
        } catch (err) {
          console.log('💬 Can compare:', 'NO');
        }
      }
      console.log('');
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
  });
