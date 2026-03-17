const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Lecture = require('../models/Lecture');
const User = require('../models/User');
const Batch = require('../models/Batch');

// Load environment variables from the backend root
dotenv.config();

const mongoUri = process.env.MONGO_URI;

async function runTest() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('Connected successfully.');

    // 1. Find one teacher
    const teacher = await User.findOne({ role: 'teacher' });
    if (!teacher) {
      console.log('No teacher found. Run createTeacher.js first.');
      return;
    }
    console.log(`Found teacher: ${teacher.name} (${teacher._id})`);

    // 2. Find one batch
    const batch = await Batch.findOne();
    if (!batch) {
      console.log('No batch found. Create a batch first.');
      return;
    }
    console.log(`Found batch: ${batch.name} (${batch._id})`);

    // 3. Create lecture
    const lectureData = {
      teacherId: teacher._id,
      batchId: batch._id,
      subject: 'Test Subject - Internal'
    };

    const newLecture = new Lecture(lectureData);
    await newLecture.save();

    // 4. Log result
    console.log('Lecture created successfully:');
    console.log(newLecture);

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB.');
    process.exit(0);
  }
}

runTest();
