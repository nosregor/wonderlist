import {
  connect,
  connection,
  Connection,
  ConnectionOptions,
  createConnection,
  Mongoose,
} from 'mongoose';

import config from '../config/index';

// READ: https://mongoosejs.com/docs/connections.html
const connectOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  poolSize: 5,
};

const MONGO_URI: string = `${config.database.MONGO_URI}`;

export const connectDB = async () => {
  // handlers;
  connection.on('connecting', () => {
    console.log('MongoDB :: connecting');
  });

  connection.on('error', (error) => {
    console.log('MongoDB :: connection ${error}');
  });

  connection.on('connected', () => {
    console.log(`MongoDB :: connecting to ${MONGO_URI}`);
  });

  connection.on('open', () => {
    console.log(`MongoDB :: connection opened`);
  });

  connection.on('reconnected', () => {
    console.log('MongoDB :: connection reconnected');
  });

  connection.on('reconnectFailed', () => {
    console.log('MongoDB :: connection reconnectFailed');
  });

  connection.on('disconnected', () => {
    console.log('MongoDB :: connection disconnected');
  });

  connection.on('fullsetup', () => {
    console.log('MongoDB :: reconnecting...%d');
  });

  try {
    const db: Mongoose = await connect(MONGO_URI, connectOptions);
  } catch (error) {
    throw error;
  }
};
