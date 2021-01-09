import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import models from './models';

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/users', (_req, res) => {
  return res.send(Object.values(models.users));
});

app.get('/users/:userId', (req, res) => {
  return res.send(models.users[req.params.userId]);
});

app.get('/lists', (_req, res) => {
  res.send(Object.values(models.lists));
});

app.post('/lists', (req, res) => {
  res.send(models.lists[req.params.listId]);
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
