'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function createSession(id: string) {
  const cookieStore = await cookies();
  cookieStore.set('session', id);
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  redirect('/');
}

export async function getCurrentSession() {
  const cookieStore = await cookies();
  return cookieStore.get('session');
}
