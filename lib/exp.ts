import { saveData } from './data';
interface LevelManagerProps {
  currentLvl: number;
  setLvl: (lvl: number) => void;
  currentExp: number;
  setExp: (exp: number) => void;
  expGained: number;
}
export function levelManager({
  currentLvl,
  setLvl,
  currentExp,
  setExp,
  expGained,
}: LevelManagerProps) {
  let levelUpReq = currentLvl * 10;
  let newLvl = currentLvl;
  let newExp = currentExp + expGained;
  while (newExp >= levelUpReq) {
    newExp -= levelUpReq;
    newLvl += 1;
    levelUpReq = currentLvl * 10;
  }
  saveData({ level: newLvl, exp: newExp });
  setExp(newExp);
  setLvl(newLvl);
}
