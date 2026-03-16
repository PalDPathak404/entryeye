const config = require('./config/env');
const app = require('./app');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`);
});
