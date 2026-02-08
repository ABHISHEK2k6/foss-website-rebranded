const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function createAdmin() {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('Error: MONGODB_URI not found in .env.local');
      console.log('Please create a .env.local file with your MongoDB connection string');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const User = mongoose.model('User', new mongoose.Schema({
      email: { type: String, unique: true },
      password: String,
      name: String,
      role: String,
    }));

    // Get admin details from command line or use defaults
    const email = process.argv[2] || 'admin@example.com';
    const password = process.argv[3] || 'admin123';
    const name = process.argv[4] || 'Admin User';

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('⚠️  Admin user with this email already exists!');
      console.log('Email:', email);
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin user
    await User.create({
      email,
      password: hashedPassword,
      name,
      role: 'admin',
    });

    console.log('\n✅ Admin user created successfully!\n');
    console.log('Login credentials:');
    console.log('==================');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('\n⚠️  IMPORTANT: Change this password after first login!');
    console.log('\nYou can now login at: http://localhost:3000/admin/login\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

console.log('Creating admin user...\n');
createAdmin();
