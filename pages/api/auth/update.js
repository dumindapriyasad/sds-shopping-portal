// Implement update profile functionality

import User from '@/models/User';
import db from '@/utils/db';
import { getToken } from 'next-auth/jwt';
import bcryptjs from 'bcryptjs';

async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(400).send({ message: `${req.method} not supported` });
  }

  const user = await getToken({ req, secret: process.env.SECRET });
  if (!user) {
    return res.status(401).send({ message: 'signin required' });
  }

  const { name, email, password } = req.body;

  if (
    !name ||
    !email ||
    !email.includes('@') ||
    (password && password.trim().length < 5)
  ) {
    res.status(422).json({
      message:
        'Validation error! Please review the details you entered and try again.',
    });
    return;
  }

  await db.connect();
  const toUpdateUser = await User.findById(user._id);
  toUpdateUser.name = name;
  toUpdateUser.email = email;

  if (password) {
    toUpdateUser.password = bcryptjs.hashSync(password);
  }

  await toUpdateUser.save();
  await db.disconnect();
  res.send({
    message: 'User updated',
  });
}

export default handler;
