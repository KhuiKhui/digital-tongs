'use client';
import Button from '@/components/Button';
import { handleLogin } from '@/lib/auth';
import Form from 'next/form';
import { redirect } from 'next/navigation';
export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div>Login</div>

      <Form
        action={(data: FormData) => {
          handleLogin(data);
          redirect('/');
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
          type="text"
          className="rounded-md border-2 border-black bg-white p-4 text-black outline-none"
          placeholder="Password"
          name="password"
        />
        <Button type="submit" label="Login" />
      </Form>
    </div>
  );
}
