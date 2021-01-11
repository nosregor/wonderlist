import { Router } from 'express';
import { List } from '../models';

const router = Router();

router
  .get('/', async (req, res) => {
    const list = await List.find({});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.send(list);
  })
  .post('/', async (req, res) => {
    const list = await List.create(req.body);
    res.send(list);
  })
  .put('/', async (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /list');
  })
  .delete('/', async (req, res) => {
    const list = await List.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (list) {
      await list.remove();
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.send({ message: 'List deleted' });
    } else {
      res.status(404).send({ message: 'List not found' });
    }
  });

router
  .get('/:listId', async (req, res) => {
    const list = await List.findById({
      id: req.params.id,
    });
    if (list) {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.send(list);
    } else {
      res.status(404).send({ message: 'List not found' });
    }
  })
  .post('/:listId', async (req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /lists/${req.params.listId}`,
    );
  })
  .put('/:listId', async (req, res) => {
    try {
      const list = await List.findByIdAndUpdate(
        req.params.listId,
        {
          $set: req.body,
        },
        { new: true },
      );
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.send(list);
    } catch (error) {
      res.status(404).send({ message: 'List not found' });
    }
  })
  .delete('/listId', async (req, res) => {
    const list = await List.findById(req.params.listId);
    if (list) {
      await list.remove();
      res.send({ message: 'List deleted' });
    } else {
      res.status(404).send({ message: 'List not found' });
    }
  });

export default router;
