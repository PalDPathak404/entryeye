const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const { hashPassword } = require('./src/utils/auth');

// Load environment variables
dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/entereye';

async function createAdmin() {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // 2. Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@test.com' });
    if (adminExists) {
      console.log('Admin user already exists');
      return;
    }

    // 3. Hash the password
    const hashedPassword = await hashPassword('password123');

    // 4. Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@test.com',
      password: hashedPassword,
      role: 'admin',
    });

    // 5. Save to database
    await adminUser.save();
    console.log('Admin created successfully');

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    // 6. Close DB connection
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
}

createAdmin();
