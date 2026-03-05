'use client';
import { useAtomValue } from 'jotai';
import { labelAtom } from '@/store';

export default function Test() {
  const isShowingLabel = useAtomValue(labelAtom);
  console.log(isShowingLabel);

  return false;
}
