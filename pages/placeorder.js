// Checkout wizard - place order screen

import CheckoutWizard from '@/components/CheckoutWizard';
import Layout from '@/components/Layout';
import { Store } from '@/utils/Store';
import { getError } from '@/utils/error';
import axios from 'axios';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // Round price
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  // Calculate shipping price, tax price and total price
  const shippingPrice = itemsPrice >= 20000 ? 0 : 500;
  const taxPrice = round2(itemsPrice * 0.05);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  // Redirect if payment method not selected
  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
  }, [paymentMethod, router]);

  // Place Order functionality
  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: 'CART_CLEAR_ITEMS' });
      Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Place Order">
      <CheckoutWizard activeStep={3} />

      <h1 className="mb-4 text-xl">Place Order</h1>

      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Shipping Address</h2>

              <div>
                {shippingAddress.fullName}, {shippingAddress.address},{' '}
                {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                {shippingAddress.country}
              </div>

              <div>
                <Link className="text-cyan-500" href="/shipping">
                  Edit
                </Link>
              </div>
            </div>

            <div className="card p-5">
              <h2 className="mb-2 text-lg">Payment Method</h2>

              <div>{paymentMethod}</div>

              <div>
                <Link className="text-cyan-500" href="/payment">
                  Edit
                </Link>
              </div>
            </div>

            <div className="card overflow-x-auto p-5">
              <h2 className="mb-2 text-lg">Order Items</h2>

              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="p-5 text-right">Quantity</th>
                    <th className="p-5 text-right">Price</th>
                    <th className="p-5 text-right">Subtotal</th>
                  </tr>
                </thead>

                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            style={{
                              maxWidth: '100%',
                              height: 'auto',
                            }}
                          ></Image>
                          &nbsp;
                          {item.name}
                        </Link>
                      </td>
                      <td className="p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">LKR {item.price}</td>
                      <td className="p-5 text-right">
                        LKR {item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <Link className="text-cyan-500" href="/cart">
                  Edit
                </Link>
              </div>
            </div>
          </div>

          <div>
            <div className="card p-5">
              <h2 className="mb-2 text-lg">Order Summary</h2>
              <h3 className="mb-2 text-sm text-cyan-600">
                (Free shipping on orders above LKR 20000)
              </h3>

              <ul>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Items</div>
                    <div>LKR {itemsPrice}</div>
                  </div>
                </li>

                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Tax</div>
                    <div>LKR {taxPrice}</div>
                  </div>
                </li>

                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Shipping</div>
                    <div>LKR {shippingPrice}</div>
                  </div>
                </li>

                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Total</div>
                    <div>LKR {totalPrice}</div>
                  </div>
                </li>

                <li>
                  <button
                    disabled={loading}
                    onClick={placeOrderHandler}
                    className="primary-button w-full"
                  >
                    {loading ? 'Loading...' : 'Place Order'}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

// Protected page (login required)
PlaceOrderScreen.auth = true;
