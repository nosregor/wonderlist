import { app } from './app';
import { connectDB } from './database/index';

app.set('port', process.env.PORT || 3000);
const port = app.get('port');

if (process.env.NODE_ENV === 'development' || 'production') {
  connectDB();
}

app.listen(port, () =>
  console.log(`Server listening on port ${port}!`),
);
