import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';

// MongoDB connection URL - using environment variable for security
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/organic-marketplace';

// MongoDB connection options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions;

// Connect to MongoDB
export async function connectToDatabase() {
  const maxRetries = 5;
  const retryDelay = 5000; // 5 seconds
  let retryCount = 0;

  const tryConnect = async () => {
    try {
      if (mongoose.connection.readyState === 1) {
        console.log('MongoDB is already connected.');
        return true;
      }

      console.log('Attempting to connect to MongoDB...');
      await mongoose.connect(MONGODB_URL, {
        ...mongooseOptions,
        serverSelectionTimeoutMS: 5000, // 5 seconds timeout for server selection
        heartbeatFrequencyMS: 2000, // Check server status every 2 seconds
      });
      
      // Add connection status check
      if (mongoose.connection.readyState !== 1) {
        throw new Error(`MongoDB connection failed. Connection state: ${mongoose.connection.readyState}`);
      }

      mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
        if (retryCount < maxRetries) {
          retryCount++;
          console.log(`Retrying connection (${retryCount}/${maxRetries})...`);
          setTimeout(tryConnect, retryDelay);
        } else {
          console.error('Max retries reached. Could not connect to MongoDB.');
          process.exit(1);
        }
      });

      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected. Attempting to reconnect...');
        if (retryCount < maxRetries) {
          retryCount++;
          console.log(`Retrying connection (${retryCount}/${maxRetries})...`);
          setTimeout(tryConnect, retryDelay);
        } else {
          console.error('Max retries reached. Could not reconnect to MongoDB.');
          process.exit(1);
        }
      });

      console.log('Successfully connected to MongoDB.');
      return true;
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      if (retryCount < maxRetries) {
        retryCount++;
        console.log(`Retrying connection (${retryCount}/${maxRetries})...`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        return tryConnect();
      } else {
        console.error('Max retries reached. Could not connect to MongoDB.');
        throw error;
      }
    }
  };

  return tryConnect();
}

// Close MongoDB connection
export async function closeDatabaseConnection() {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed.');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    throw error;
  }
}

// Create MongoDB session store
export const sessionStore = MongoStore.create({
  mongoUrl: MONGODB_URL,
  ttl: 24 * 60 * 60, // Session TTL (1 day)
  autoRemove: 'native',
});

// Export mongoose instance
export { mongoose };