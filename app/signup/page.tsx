'use client';
import { handleSignup } from '@/lib/auth';
import Form from 'next/form';
import Button from '@/components/Button';
import { redirect } from 'next/navigation';
import { useState } from 'react';
export default function Signup() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div>Sign up</div>

      <Form
        action={(data: FormData) => {
          if (password === passwordConfirm) {
            handleSignup(data);
            redirect('/');
          } else {
            redirect('/signup');
          }
        }}
        className="flex flex-col items-center justify-center gap-4"
      >
        <input
          type="text"
          className="rounded-md border-2 border-black bg-white p-4 text-black outline-none"
          placeholder="Username"
          name="username"
        />
        <input
          type="password"
          className="rounded-md border-2 border-black bg-white p-4 text-black outline-none"
          placeholder="Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          className="rounded-md border-2 border-black bg-white p-4 text-black outline-none"
          placeholder="Confirm password"
          name="password"
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <Button type="submit" label="Sign up" />
      </Form>
    </div>
  );
}
