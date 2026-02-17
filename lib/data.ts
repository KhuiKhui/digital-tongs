'use server';
import prisma from './prisma';
import { getCurrentSession } from './session';

export async function saveData(data: any) {
  const userId = await getCurrentSession();
  await prisma.user.update({
    where: {
      id: userId?.value,
    },
    data: {
      chars: data.chars,
    },
  });
}

export async function getData() {
  const userId = await getCurrentSession();
  console.log(userId);
  const user = await prisma.user.findFirst({
    where: {
      id: userId?.value,
    },
  });
  console.log(user);

  return user?.chars;
}
