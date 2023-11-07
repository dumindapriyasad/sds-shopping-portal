import Layout from '@/components/Layout';
import ProductItem from '@/components/ProductItem';
import Product from '@/models/Product';
import { Store } from '@/utils/Store';
import db from '@/utils/db';
import axios from 'axios';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  // Add to cart functionality
  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    toast.success('Product added to the cart');
  };

  return (
    <Layout title="Home Page">
      {/* Carousel */}
      <Carousel
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        infiniteLoop={true}
      >
        <div>
          <Image
            src="/images/c01.jpeg"
            alt="Carousel Image 01"
            width={640}
            height={640}
            priority={true}
            className="carousel-image"
          ></Image>
        </div>

        <div>
          <Image
            src="/images/c02.jpeg"
            alt="Carousel Image 02"
            width={640}
            height={640}
            priority={true}
            className="carousel-image"
          ></Image>
        </div>

        <div>
          <Image
            src="/images/c03.jpeg"
            alt="Carousel Image 03"
            width={640}
            height={640}
            priority={true}
            className="carousel-image"
          ></Image>
        </div>

        <div>
          <Image
            src="/images/c04.jpeg"
            alt="Carousel Image 04"
            width={640}
            height={640}
            priority={true}
            className="carousel-image"
          ></Image>
        </div>

        <div>
          <Image
            src="/images/c05.jpeg"
            alt="Carousel Image 05"
            width={640}
            height={640}
            priority={true}
            className="carousel-image"
          ></Image>
        </div>
      </Carousel>

      <h2 className="h4 my-4">Latest Products</h2>

      {/* Load product thumbnails */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          ></ProductItem>
        ))}
      </div>
    </Layout>
  );
}

// Load products from DB
export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
