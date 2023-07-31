// Checkout wizard - payment method screen

import React, { useContext, useEffect, useState } from 'react';
import { Store } from '@/utils/Store';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import CheckoutWizard from '@/components/CheckoutWizard';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;
  const router = useRouter();

  // Submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    if (!selectedPaymentMethod) {
      return toast.error('Payment method is required');
    }

    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });

    // Save payment method in cookies
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push('/placeorder');
  };

  // Check shipping address is entered and save payment method
  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/shipping');
    }

    setSelectedPaymentMethod(paymentMethod || '');
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Layout title="Payment Method">
      <CheckoutWizard activeStep={2} />
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl">Payment Method</h1>

        {['PayPal', 'CashOnDelivery'].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={payment}
              type="radio"
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />

            <label className="p-2" htmlFor={payment}>
              {payment}
            </label>
          </div>
        ))}

        <div className="mb-4 flex justify-between">
          <button
            onClick={() => router.push('/shipping')}
            type="button"
            className="default-button"
          >
            Back
          </button>

          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}

// Protected page (login required)
PaymentScreen.auth = true;
