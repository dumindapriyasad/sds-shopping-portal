// Sign up page

import Layout from '@/components/Layout';
import { getError } from '@/utils/error';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function LoginScreen() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  // Redirect if already signed in
  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  // Initialize react hook form
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  // Custom form validations
  const customValidations = (value, fieldName) => {
    if (value.trim() === '') {
      return `${fieldName} cannot be empty`;
    }

    return true;
  };

  // Sign up functionality
  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Create Account">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Create Account</h1>

        <div className="mb-4">
          <label htmlFor="name">Name</label>

          <input
            type="text"
            className="w-full"
            id="name"
            autoFocus
            {...register('name', {
              required: 'Please enter name',
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: 'Name can only contain letters',
              },
              validate: (value) => customValidations(value, 'name'),
            })}
          />

          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email">Email</label>

          <input
            type="email"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
              },
            })}
            className="w-full"
            id="email"
          ></input>

          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password">Password</label>

          <input
            type="password"
            {...register('password', {
              required: 'Please enter password',
              minLength: {
                value: 6,
                message: 'Password must be 06 characters or more',
              },
            })}
            className="w-full"
            id="password"
            autoFocus
          ></input>

          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword">Confirm Password</label>

          <input
            className="w-full"
            type="password"
            id="confirmPassword"
            {...register('confirmPassword', {
              required: 'Please enter confirm password',
              validate: (value) => value === getValues('password'),
              minLength: {
                value: 6,
                message: 'Password must be 06 characters or more',
              },
            })}
          />

          {errors.confirmPassword && (
            <div className="text-red-500 ">
              {errors.confirmPassword.message}
            </div>
          )}

          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <div className="text-red-500 ">Passwords do not match</div>
            )}
        </div>

        <div className="mb-4 ">
          <button className="primary-button">Register</button>
        </div>

        <div className="mb-4 ">
          Already have an account? &nbsp;
          <Link href={`/login?redirect=${redirect || '/'}`}>Login</Link>
        </div>
      </form>
    </Layout>
  );
}
