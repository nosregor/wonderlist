import { connect, ConnectionOptions } from 'mongoose';
import { MONGO_URI } from '../config/index';

const connectDB = async () => {
  const connectOptions: ConnectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };

  try {
    await connect(MONGO_URI, connectOptions);

    console.info(
      `Connected to database on Worker process: ${process.pid}`,
    );
  } catch (error) {
    console.error(
      `Connection error: ${error.stack} on Worker process: ${process.pid}`,
    );
    process.exit(1);
  }
};

export default connectDB;
