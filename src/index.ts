import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/lists', (_req, res) => {
  res.send('GET HTTP method on list resource');
});

app.post('/lists', (_req, res) => {
  res.send('POST HTTP method on list resource');
});

app.put('/lists/:listId', (req, res) => {
  res.send(`PUT HTTP method on list/${req.params.listId} resource`);
});

app.delete('/lists/:listId', (req, res) => {
  res.send(`DELETE HTTP method on list/${req.params.listId} resource`);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
