'use client';
import Button from './Button';
import { deleteSession } from '@/lib/session';
export default function LogoutButton() {
  return (
    <Button
      onClick={() => {
        deleteSession();
        localStorage.clear();
      }}
      label="Logout"
    />
  );
}
