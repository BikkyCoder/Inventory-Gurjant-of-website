import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ui_components';
  console.log(`📡 Connecting to MongoDB: ${mongoUri}`);
  
  try {
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    return false;
  }
};

const checkDatabase = async () => {
  try {
    const db = mongoose.connection;
    const mongoDb = db.getClient().db(db.name);
    
    // Get all collection names
    const collections = await mongoDb.listCollections().toArray();
    console.log('\n📚 Collections in database:', db.name);
    console.log('===============================');
    
    if (collections.length === 0) {
      console.log('(No collections found)');
      return;
    }
    
    for (const collection of collections) {
      const col = mongoDb.collection(collection.name);
      const count = await col.countDocuments();
      console.log(`\n📋 ${collection.name}: ${count} documents`);
      
      if (count > 0 && (collection.name === 'users' || collection.name === 'pendingsignups')) {
        const sample = await col.findOne();
        console.log('   Sample document:');
        console.log('   ' + JSON.stringify(sample, null, 2).split('\n').join('\n   '));
      }
    }
    
    console.log('\n' + '='.repeat(50));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('\n✅ Database connection closed');
  }
};

// Run
(async () => {
  const connected = await connectDB();
  if (connected) {
    await checkDatabase();
  }
  process.exit(0);
})();
