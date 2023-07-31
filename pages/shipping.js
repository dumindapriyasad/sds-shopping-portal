// Checkout wizard - shipping screen

import React, { useContext, useEffect } from 'react';
import Layout from '@/components/Layout';
import CheckoutWizard from '@/components/CheckoutWizard';
import { useForm } from 'react-hook-form';
import { Store } from '@/utils/Store';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function ShippingScreen() {
  // Initialize react hook form
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  // Custom form validations
  const customValidations = (value, fieldName) => {
    if (value.trim() === '') {
      return `${fieldName} cannot be empty`;
    }

    return true;
  };

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  // Fill input boxes based on the previous data in react context at the beginning of loading this component
  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, [setValue, shippingAddress]);

  // Shipping address handler
  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    });

    // Save shipping address in cookies
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );

    router.push('/payment');
  };

  return (
    <Layout title="Shipping Address">
      <CheckoutWizard activeStep={1} />

      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Shipping Address</h1>

        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>

          <input
            className="w-full"
            id="fullName"
            autoFocus
            {...register('fullName', {
              required: 'Please enter full name',
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: 'Full name can only contain letters',
              },
              validate: (value) => customValidations(value, 'Full name'),
            })}
          />

          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="address">Address</label>

          <input
            className="w-full"
            id="address"
            {...register('address', {
              required: 'Please enter address',
              minLength: {
                value: 3,
                message: 'Address must be more than 03 characters',
              },
              validate: (value) => customValidations(value, 'Address'),
            })}
          />

          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="city">City</label>

          <input
            className="w-full"
            id="city"
            {...register('city', {
              required: 'Please enter city',
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: 'City can only contain letters',
              },
              validate: (value) => customValidations(value, 'City'),
            })}
          />

          {errors.city && (
            <div className="text-red-500 ">{errors.city.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="postalCode">Postal Code</label>

          <input
            className="w-full"
            id="postalCode"
            {...register('postalCode', {
              required: 'Please enter postal code',
              pattern: {
                value: /^[0-9]+$/,
                message: 'Please enter valid postal code',
              },
            })}
          />

          {errors.postalCode && (
            <div className="text-red-500 ">{errors.postalCode.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="country">Country</label>

          <input
            className="w-full"
            id="country"
            {...register('country', {
              required: 'Please enter country',
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: 'Country can only contain letters',
              },
              validate: (value) => customValidations(value, 'Country'),
            })}
          />

          {errors.country && (
            <div className="text-red-500 ">{errors.country.message}</div>
          )}
        </div>

        <div className="mb-4 flex justify-between">
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}

// Protected page (login required)
ShippingScreen.auth = true;
