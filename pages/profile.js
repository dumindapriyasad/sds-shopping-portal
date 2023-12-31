// User profile page

import Layout from '@/components/Layout';
import { getError } from '@/utils/error';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function ProfileScreen() {
  const { data: session } = useSession();

  // Initialize react hook form
  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  // Custom form validations
  const customValidations = (value, fieldName) => {
    if (value.trim() === '') {
      return `${fieldName} cannot be empty`;
    }

    return true;
  };

  // Update name and email in session
  useEffect(() => {
    setValue('name', session.user.name);
    setValue('email', session.user.email);
  }, [session.user, setValue]);

  // Update profile functionality
  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.put('/api/auth/update', {
        name,
        email,
        password,
      });

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      toast.success('Profile updated successfully!');

      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Profile">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Update Profile</h1>

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
            className="w-full"
            id="email"
            {...register('email', {
              required: 'Please enter email',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
              },
            })}
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password">New Password</label>

          <input
            className="w-full"
            type="password"
            id="password"
            {...register('password', {
              required: 'Please enter new password',
              minLength: {
                value: 6,
                message: 'Password must be 06 characters or more',
              },
            })}
          />
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword">Confirm New Password</label>

          <input
            className="w-full"
            type="password"
            id="confirmPassword"
            {...register('confirmPassword', {
              required: 'Please confirm new password',
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

        <div className="mb-4">
          <button className="primary-button">Update Profile</button>
        </div>
      </form>
    </Layout>
  );
}

// Protected page (login required)
ProfileScreen.auth = true;
