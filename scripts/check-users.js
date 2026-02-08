const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function checkUsers() {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('Error: MONGODB_URI not found in .env.local');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    const User = mongoose.model('User', new mongoose.Schema({
      email: String,
      password: String,
      name: String,
      role: String,
    }));

    // Find all users
    const users = await User.find({}).select('+password');
    
    console.log('📋 Users in database:');
    console.log('='.repeat(50));
    
    if (users.length === 0) {
      console.log('No users found!');
    } else {
      users.forEach((user, index) => {
        console.log(`\nUser ${index + 1}:`);
        console.log('  Email:', user.email);
        console.log('  Name:', user.name);
        console.log('  Role:', user.role);
        console.log('  Password Hash:', user.password?.substring(0, 20) + '...');
        console.log('  Created:', user.createdAt);
        console.log('  ID:', user._id);
      });
    }
    
    console.log('\n' + '='.repeat(50));
    console.log(`Total users: ${users.length}\n`);
    
    // Check for the specific email
    const foss26User = await User.findOne({ email: 'foss26@gmail.com' });
    if (foss26User) {
      console.log('✅ foss26@gmail.com exists in database');
    } else {
      console.log('❌ foss26@gmail.com NOT FOUND in database');
    }
    
    const adminUser = await User.findOne({ email: 'admin@example.com' });
    if (adminUser) {
      console.log('✅ admin@example.com exists in database');
    } else {
      console.log('❌ admin@example.com NOT FOUND in database');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

console.log('Checking users in database...\n');
checkUsers();
