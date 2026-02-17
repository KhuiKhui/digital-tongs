'use client';
import Button from '@/components/Button';
import { handleLogin } from '@/lib/auth';
import { getData, saveData } from '@/lib/data';
import { charAtom } from '@/store';
import { useSetAtom } from 'jotai';
import Form from 'next/form';
import { redirect } from 'next/navigation';
export default function Login() {
  const setPulls = useSetAtom(charAtom);
  async function authInit(data: FormData) {
    handleLogin(data);
    const pulls = await getData();
    console.log(pulls);
    setPulls(pulls!);
    localStorage.setItem('chars', JSON.stringify(pulls));
    redirect('/');
  }
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div>Login</div>
      <Form
        action={(data: FormData) => {
          authInit(data);
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
        />
        <Button type="submit" label="Login" />
      </Form>
    </div>
  );
}
