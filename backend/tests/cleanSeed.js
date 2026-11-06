import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Component } from './models/ComponentModel.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ui_componts';

const components = [
 
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ Connected to MongoDB');

    // Delete all existing components
    await Component.deleteMany({});
    console.log('🗑️  Cleared all existing components');

    // Insert all components
    const result = await Component.insertMany(components);
    console.log(`✅ Created ${result.length} components:`);
    
    components.forEach((comp, idx) => {
      console.log(`   ${idx + 1}. ${comp.name} (${comp.category})`);
    });

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    process.exit(1);
  }
}

seedDatabase();
