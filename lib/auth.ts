'use server';
import prisma from './prisma';
import bcrypt from 'bcrypt';
import { createSession } from './session';

export async function handleLogin(data: FormData) {
  const username = data.get('username') as string;
  const password = data.get('password') as string;

  const user = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  if (user) {
    const authenticated = bcrypt.compareSync(password, user.password);
    if (authenticated) {
      await createSession(user.id);
    }
  }
}

export async function handleSignup(data: FormData) {
  const username = data.get('username') as string;
  const password = await bcrypt.hash(data.get('password') as string, 10);

  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (!user) {
    const newUser = await prisma.user.create({
      data: {
        username: username,
        password: password,
      },
    });
    await createSession(newUser.id);
  }
}
