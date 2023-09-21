// Seed sample users and products within the DB

import db from '@/utils/db';
import data from '@/utils/data';
import User from '@/models/User';
import Product from '@/models/Product';

const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();
  await User.insertMany(data.users);
  await db.disconnect();
  await Product.deleteMany();
  await Product.insertMany(data.products);
  res.send({ message: 'seeded successfully' });
};

export default handler;
