'use client';
import { cn } from '@/lib/utils';
import ChooseModal from './ChooseModal';
import GachaOneRollModal from './GachaOneRollModal';
import { useAtomValue } from 'jotai';
import {
  chooseCharModalAtom,
  gachaOneRollModalAtom,
  gachaTenRollModalAtom,
  labelModalAtom,
} from '@/store';
import GachaTenRollModal from './GachaTenRollModal';
import LabelModal from './LabelModal';

export default function Modals() {
  const chooseModal = useAtomValue(chooseCharModalAtom);
  const gachaOneRollModal = useAtomValue(gachaOneRollModalAtom);
  const gachaTenRollModal = useAtomValue(gachaTenRollModalAtom);
  const labelModal = useAtomValue(labelModalAtom);
  return (
    <div
      className={cn(
        'absolute top-1/2 left-1/2 h-[90%] w-[70%] -translate-x-1/2 -translate-y-1/2',
        {
          hidden:
            !chooseModal &&
            !gachaOneRollModal &&
            !gachaTenRollModal &&
            !labelModal,
        },
      )}
    >
      <GachaOneRollModal />
      <GachaTenRollModal />
      <ChooseModal />
      <LabelModal />
    </div>
  );
}
