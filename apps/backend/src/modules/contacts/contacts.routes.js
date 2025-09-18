import express from 'express';
import contactsRepository from './contacts.repository.js';
import {
  createContactRouteSchema,
  deleteContactRouteSchema,
  updateContactRouteSchema,
} from './contacts.routes.schemas.js';
const contactsRouter = express.Router();

contactsRouter.get('/', async (req, res) => {
  const user = req.user;
  const contacts = await contactsRepository.getAll({ userId: user.id });
  res.json(contacts);
});

contactsRouter.post('/', async (req, res) => {
  const user = req.user;
  const body = createContactRouteSchema.body.parse(req.body);
  const newContact = await contactsRepository.addOne({ ...body, userId: user.id });
  res.json(newContact);
});

contactsRouter.delete('/:id', async (req, res) => {
  const user = req.user;
  const params = deleteContactRouteSchema.params.parse(req.params);
  console.log('PARAMS', params);
  const contactDeleted = await contactsRepository.deleteOneById({
    contactId: params.id,
    userId: user.id,
  });
  console.log('CONTACTO ELIMINADO', contactDeleted);

  res.json(contactDeleted);
});

contactsRouter.put('/:id', async (req, res) => {
  const user = req.user;
  const body = updateContactRouteSchema.body.parse(req.body);
  const params = updateContactRouteSchema.params.parse(req.params);
  const contactUpdated = await contactsRepository.updateOneById(params.id, {
    ...body,
    userId: user.id,
  });
  res.json(contactUpdated);
});

export default contactsRouter;
