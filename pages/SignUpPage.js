```jsx
import React, { useState } from'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API_BASE_URL } from '../config';

import TextInput from '../components/TextInput';
import PasswordInput from '../components/PasswordInput';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});

const SignUpPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      await axios.post(`${API_BASE_URL}/signup`, data);
      toast.success('Sign up successful! Please log in.');
      navigate('/login');
    } catch (error) {
      toast.error('Sign up failed. Please try again.');
    }
  };

  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Username"
          type="text"
          {...register('username')}
          error={errors.username?.message}
        />
        <TextInput
          label="Email"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />
        <PasswordInput
          label="Password"
          type="password"
          {...register('password')}
          error={errors.password?.message}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
```