'use client';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { labelAtom, labelModalAtom } from '@/store';
import { capitalize, cn } from '@/lib/utils';
import Panel from '../Panel';
import Button from '../Button';
import { litter } from '@/const/litter';

export default function LabelModal() {
  const label = useAtomValue(labelAtom);
  const [labelModal, setLabelModalState] = useAtom(labelModalAtom);
  const litterObj = litter[label];

  return (
    <Panel
      className={cn(
        'top-1/2 left-1/2 z-10 size-fit -translate-x-1/2 -translate-y-1/2',
        {
          hidden: !labelModal,
        },
      )}
      setVisibility={setLabelModalState}
    >
      <div className="flex size-full flex-col items-center justify-center p-4">
        <div className="text-2xl font-bold">
          You picked up {litterObj.name} ({litterObj.rarity})!
        </div>
        <div className="mb-4">{litterObj.desc}</div>
        <div className="text-xl font-bold">Rewards</div>
        <div>money: {litterObj.money} DD</div>
        <div>exp: {litterObj.exp}</div>
      </div>
      <Button
        className="w-full px-4 py-2"
        label="Confirm"
        onClick={() => setLabelModalState(false)}
      />
    </Panel>
  );
}
