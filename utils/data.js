import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Duminda',
      email: 'duminda.priyasad@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Amila',
      email: 'amila@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Huda Beauty Makeup Set',
      slug: 'huda-beauty-makeup-set',
      category: 'Makeup',
      image: '/images/huda-beauty-makeup-set.jpg',
      price: 1999,
      brand: 'Huda Beauty',
      rating: 4.5,
      numReviews: 8,
      countInStock: 5,
      description: 'Huda Beauty Naughty Makeup Set',
    },
    {
      name: 'RENEE Madness Lipstick',
      slug: 'renee-madness-lipstick',
      category: 'Lipstick',
      image: '/images/renee-madness-lipstick.jpg',
      price: 2990,
      brand: 'RENEE',
      rating: 4.5,
      numReviews: 8,
      countInStock: 10,
      description: 'RENEE Madness PH Lipstick',
    },
    {
      name: 'Kryolan Tv Foundasion',
      slug: 'kryolan-tv-foundasion',
      category: 'Foundasion',
      image: '/images/kryolan-tv-foundasion.jpg',
      price: 2890,
      brand: 'KRYOLAN',
      rating: 4.5,
      numReviews: 8,
      countInStock: 15,
      description: 'Kryolan Tv Foundasion Stick Oriental',
    },
    {
      name: 'Miss Rose Eyeliner',
      slug: 'miss-rose-eyeliner',
      category: 'Eyeliners',
      image: '/images/miss-rose-eyeliner.jpg',
      price: 690,
      brand: 'Miss Rose',
      rating: 4.5,
      numReviews: 8,
      countInStock: 12,
      description: 'Miss Rose Waterproof Eyeliner',
    },
    {
      name: 'Menggh Glue False Nails',
      slug: 'menggh-glue-false-nails',
      category: 'Artificial Nails',
      image: '/images/menggh-glue-false-nails.jpg',
      price: 770,
      brand: 'Menggh',
      rating: 4.5,
      numReviews: 8,
      countInStock: 22,
      description: 'Menggh 24pcs With Glue False Nails',
    },
    {
      name: 'BELLOSÉ Shampoo',
      slug: 'bellosé-shampoo',
      category: 'Shampoo',
      image: '/images/bellosé-shampoo.jpg',
      price: 1799,
      brand: 'BELLOSÉ',
      rating: 4.5,
      numReviews: 8,
      countInStock: 6,
      description: 'BELLOSÉ Shampoo + Conditioner',
    },
  ],
};

export default data;
