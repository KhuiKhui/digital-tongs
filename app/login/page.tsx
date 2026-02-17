'use client';
import Button from '@/components/Button';
import { handleLogin } from '@/lib/auth';
import { getData } from '@/lib/data';
import {
  charAtom,
  chosenCharAtom,
  expAtom,
  fundsAtom,
  levelAtom,
} from '@/store';
import { useSetAtom } from 'jotai';
import Form from 'next/form';
import { redirect } from 'next/navigation';
export default function Login() {
  const setPulls = useSetAtom(charAtom);
  const setLevel = useSetAtom(levelAtom);
  const setExp = useSetAtom(expAtom);
  const setFunds = useSetAtom(fundsAtom);
  const setChosenChar = useSetAtom(chosenCharAtom);
  async function authInit(data: FormData) {
    handleLogin(data);
    const userData = await getData();
    setPulls(userData!.chars!);
    setLevel(userData!.level!);
    setExp(userData!.exp!);
    setFunds(userData!.funds!);
    setChosenChar(userData!.chosenChar!);
    localStorage.setItem('chars', JSON.stringify(userData?.chars));
    localStorage.setItem('level', JSON.stringify(userData?.level));
    localStorage.setItem('exp', JSON.stringify(userData?.exp));
    localStorage.setItem('funds', JSON.stringify(userData?.funds));
    localStorage.setItem('chosenChar', JSON.stringify(userData?.chosenChar));
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
