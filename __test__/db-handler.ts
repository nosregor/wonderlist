import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

/**
 * Connect to the in-memory database.
 */
export const connect = async () => {
  const uri = await mongod.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };
  await mongoose.connect(uri, mongooseOpts);
};

/**
 * Drop database, close the connection and stop mongod.
 */
export const closeDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoose.disconnect();
    await mongod.stop();
  }
};

/**
 * Remove all the data for all db collections.
 */
export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  console.log(Object.keys(collections).length);

  if (mongoose.connection.readyState !== 0) {
    const promises = Object.keys(collections).map((collection) =>
      mongoose.connection.collection(collection).deleteMany({}),
    );
    await Promise.all(promises);
  }
};
