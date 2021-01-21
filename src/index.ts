import { connectDB } from './database';
import server from './server';

const port = server.get('port');

connectDB()
  .then(() => {
    server.listen(port, () =>
      console.log(`Server listening on port ${port}!`),
    );
  })
  .catch((error) => {
    console.error(
      'Unexpected error while connecting to the DB: ',
      error,
    );
  });
