import {
  Connection,
  ConnectionOptions,
  createConnection,
} from 'mongoose';
import config from '../config/index';

// READ: https://mongoosejs.com/docs/connections.html
const connectOptions: ConnectionOptions = {
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 1000,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: false,
};

const MONGO_URI: string = `${config.database.MONGO_URI}${config.database.MONGODB_DB_MAIN}`;

export const db: Connection = createConnection(
  MONGO_URI,
  connectOptions,
);

// handlers
db.on('connecting', () => {
  console.log('MongoDB :: connecting');
});

db.on('error', (error) => {
  console.log('MongoDB :: connection ${error}');
});

db.on('connected', () => {
  console.log('MongoDB :: connecting');
});

db.on('connecting', () => {
  console.log('MongoDB :: connecting');
});

db.on('connecting', () => {
  console.log('MongoDB :: connected');
});

db.on('open', () => {
  console.log('MongoDB :: connection opened');
});

db.on('reconnected', () => {
  console.log('MongoDB :: connection reconnected');
});

db.on('reconnectFailed', () => {
  console.log('MongoDB :: connection reconnectFailed');
});

db.on('disconnected', () => {
  console.log('MongoDB :: connection opened');
});
db.on('fullsetup', () => {
  console.log('MongoDB :: reconnecting...%d');
});
