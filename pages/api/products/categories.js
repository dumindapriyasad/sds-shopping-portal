// Get product category list

import Product from '@/models/Product';
import db from '@/utils/db';

const handler = async (req, res) => {
  await db.connect();
  const categories = await Product.find().distinct('category');
  await db.disconnect();
  res.send(categories);
};

export default handler;
