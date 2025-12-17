import { useState } from "react";

export function useDiceRoll() {
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);
    const finalRoll = Math.floor(Math.random() * 6) + 1;
    let count = 0;
    const maxSpins = 10;

    const interval = setInterval(() => {
      setDiceResult(Math.floor(Math.random() * 6) + 1);
      count++;

      if (count >= maxSpins) {
        clearInterval(interval);
        setDiceResult(finalRoll);
        setIsRolling(false);
      }
    }, 80);
  };

  const resetDice = () => {
    setDiceResult(null);
  };

  return { diceResult, isRolling, rollDice, resetDice };
}
