require('dotenv').config();

const requiredEnvs = ['PORT', 'MONGO_URI', 'JWT_SECRET'];

requiredEnvs.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

const config = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = config;
