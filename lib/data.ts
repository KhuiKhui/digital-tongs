'use server';
import prisma from './prisma';
import { getCurrentSession } from './session';

interface GameData {
  level?: number;
  exp?: number;
  funds?: number;
  chars?: string[];
  chosenChar?: string;
}

export async function saveData(data: GameData) {
  const userId = await getCurrentSession();
  await prisma.user.update({
    where: {
      id: userId?.value,
    },
    data: {
      ...data,
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

  if (user) {
    return user;
  }
}
