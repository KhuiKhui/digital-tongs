'use client';

import { chooseCharModalAtom } from '@/store';
import { useSetAtom } from 'jotai';
import Button from './Button';

export default function ChooseButton() {
  const setChooseCharModal = useSetAtom(chooseCharModalAtom);
  return <Button onClick={() => setChooseCharModal(true)} label="Choose" />;
}
