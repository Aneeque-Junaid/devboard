// src/config/index.ts

import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  databaseUrl: process.env.DATABASE_URL as string,
  jwtSecret: process.env.JWT_SECRET as string,
};

// A simple check to ensure all required environment variables are set
if (!config.databaseUrl || !config.jwtSecret) {
  throw new Error(
    'Missing required environment variables. Please check your .env file.'
  );
}

export default config;
