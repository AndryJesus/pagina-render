import express from 'express';
import { forgotPasswordRouteSchema, resetPasswordRouteSchema } from './email.routes.schemas.js';
import usersRepository from './users.repository.js';
import jwt from 'jsonwebtoken';
import nodemailerService from '../../services/nodemailer.js';
const emailRouter = express.Router();

emailRouter.post('/', async (req, res) => {
  const body = forgotPasswordRouteSchema.body.parse(req.body);
  const newUser = await usersRepository.updatePassword({ email: body.email });
  const token = jwt.sign(
    { id: newUser.id, email: newUser.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '10m' },
  );
  await nodemailerService.sendMail({
    from: process.env.EMAIL_USER,
    to: body.email,
    subject: 'Verifica tu correo',
    html: `<a href="http://localhost:4321/verify/${token}">Verifica tu correo</a>`,
  });

  res.sendStatus(200);
});

emailRouter.patch('/verify', async (req, res) => {
  const body = resetPasswordRouteSchema.body.parse(req.body);
  const decodedToken = jwt.verify(body.token, process.env.REFRESH_TOKEN_SECRET);
  await usersRepository.verifyOne({ id: decodedToken.id });
  res.status(200).json({ message: 'Su correo ha sido verificado exitosamente' });
});

export default emailRouter;
