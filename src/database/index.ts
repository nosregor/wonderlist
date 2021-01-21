import {
  connect,
  connection,
  ConnectionOptions,
  Mongoose,
} from 'mongoose';

import config from '../config/index';

// TODO: inversion control (init, shutDown, getConnection)
// Add support for Inversion of Control through inversify
const connectOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  poolSize: 5,
};

const MONGO_URI = `${config.database.MONGO_URI}`;

export const connectDB = async (): Promise<Mongoose> => {
  // handlers;
  connection.on('connecting', () => {
    console.log('MongoDB :: connecting');
  });

  connection.on('error', (error) => {
    console.log('MongoDB :: connection ${error}');
  });

  connection.on('connected', () => {
    console.log(`MongoDB :: connected to ${MONGO_URI}`);
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

  return await connect(MONGO_URI, connectOptions);
};
