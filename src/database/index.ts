import { connect, ConnectionOptions } from 'mongoose';

const connectDB = async () => {
  // const mongoURI:string  = process.env.DATABASE_URL;
  const mongoURI = 'mongodb://localhost:27017/wonderlist-database';
  const connectOptions: ConnectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: true,
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

// const disconnect = () => {
//   if (!database) {
//     return;
//   }
//   Mongoose.disconnect();
// };

export default connectDB;
