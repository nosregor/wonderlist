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
  .post('/', async (req, res, next) => {
    let list;

    try {
      const { title, description } = req.body;
      await List.create({ title, description });
    } catch (error) {
      // validation errors
      return res.status(400).json({ error: error.toString() });
    }

    return res.send(list);
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
    }
    return res.send({ message: 'List deleted' });
  });

router
  .get('/:listId', async (req, res) => {
    const list = await List.findById({
      id: req.params.id,
    });
    res.send(list);
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
      res.send(list);
    } catch (error) {
      res.status(404).send({ message: 'List not found' });
    }
  })
  .delete('/listId', async (req, res) => {
    const list = await List.findById(req.params.listId);
    if (list) {
      await list.remove();

      return res.send(list);
    }
  });

export default router;
