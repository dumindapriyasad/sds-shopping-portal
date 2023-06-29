// Seed sample users within the DB

import db from '@/utils/db';
import data from '@/utils/data';
import User from '@/models/User';

const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await db.disconnect();
  res.send({ message: 'seeded successfully' });
};

export default handler;
