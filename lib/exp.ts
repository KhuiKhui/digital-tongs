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
  const levelUpReq = currentLvl * 10;
  setExp(currentExp + expGained);
  if (currentExp + expGained >= levelUpReq) {
    setExp(currentExp + expGained - levelUpReq);
    setLvl(currentLvl + 1);
  }
}
