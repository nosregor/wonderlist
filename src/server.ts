import { app } from './app';
import { connectDB } from './database/index';

app.set('port', process.env.PORT || 3000);
const port = app.get('port');

connectDB()
  .then(() => {
    app.listen(port, () =>
      console.log(`Server listening on port ${port}!`),
    );
  })
  .catch((error) => {
    console.error(
      'Unexpected error while connecting to the DB: ',
      error,
    );
  });
