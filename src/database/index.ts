import { connect, ConnectionOptions } from 'mongoose';

const connectDB = async () => {
  // const mongoURI:string  = process.env.MONGO_URI;
  const mongoURI = 'mongodb://localhost:27017/wonderlist-database';
  const connectOptions: ConnectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };

  try {
    await connect(mongoURI, connectOptions);

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
