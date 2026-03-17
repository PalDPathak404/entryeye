const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./src/models/User');
const { hashPassword } = require('./src/utils/auth');

// Load environment variables
dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/entereye';

async function createTeacher() {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // 2. Check if teacher already exists
    const teacherExists = await User.findOne({ email: 'teacher@test.com' });
    if (teacherExists) {
      console.log('Teacher user already exists');
      return;
    }

    // 3. Hash the password
    const hashedPassword = await hashPassword('password123');

    // 4. Create teacher user
    const teacherUser = new User({
      name: 'Teacher User',
      email: 'teacher@test.com',
      password: hashedPassword,
      role: 'teacher',
    });

    // 5. Save to database
    await teacherUser.save();
    console.log('Teacher created successfully');

  } catch (error) {
    console.error('Error creating teacher user:', error);
  } finally {
    // 6. Close DB connection
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    process.exit(0);
  }
}

createTeacher();
