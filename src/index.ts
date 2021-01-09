import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users: any = {
  1: {
    id: '1',
    username: 'Werdna',
  },
  2: {
    id: '2',
    username: 'Dave',
  },
};

const lists: any = {
  1: {
    id: '1',
    name: 'ShoppingList',
    userId: '1',
  },
  2: {
    id: '2',
    name: 'Todo',
    userId: '1',
  },
};

// let tasks: any = {
//   1: {
//     id: '1',
//     name: 'Banana',
//     listId: '1',
//   },
//   2: {
//     id: '2',
//     name: 'Apple',
//     listId: '1',
//   },
//   3: {
//     id: '2',
//     name: 'Pear',
//     listId: '1',
//   },
// };

app.get('/users', (_req, res) => {
  return res.send(Object.values(users));
});

app.get('/users/:userId', (req, res) => {
  return res.send(users[req.params.userId]);
});

app.get('/lists', (_req, res) => {
  res.send(Object.values(lists));
});

app.post('/lists', (req, res) => {
  res.send(lists[req.params.listId]);
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
