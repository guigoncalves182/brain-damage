import { useEffect, useRef, useState } from "react";
import Archetype from "../archetype";

const MAX_BRAIN_DAMAGE = Number(process.env.NEXT_PUBLIC_MAX_BRAIN_DAMAGE) || 6;

type BrainDamagePosition =
  | "topLeft"
  | "topRight"
  | "middleLeft"
  | "middleRight"
  | "bottomLeft"
  | "bottomRight";

interface BrainDamageState {
  topLeft: number;
  topRight: number;
  middleLeft: number;
  middleRight: number;
  bottomLeft: number;
  bottomRight: number;
}

const STORAGE_KEY_PREFIX = "brain-damage-";

export function useBrainDamage(archetype: Archetype) {
  const storageKey = `${STORAGE_KEY_PREFIX}${archetype.id}`;
  const isFirstRender = useRef(true);

  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [isRolling, setIsRolling] = useState(false);

  // Sempre inicializar com valores padrão do arquétipo (evita hidration mismatch)
  const [brainDamage, setBrainDamage] = useState<BrainDamageState>({
    topLeft: archetype.brainDamage.topLeft,
    topRight: archetype.brainDamage.topRight,
    middleLeft: archetype.brainDamage.middleLeft,
    middleRight: archetype.brainDamage.middleRight,
    bottomLeft: archetype.brainDamage.bottomLeft,
    bottomRight: archetype.brainDamage.bottomRight,
  });

  // Carregar do localStorage após a hidratação
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);

        setBrainDamage(parsed);
      }
    } catch (error) {
      console.error("Erro ao carregar Brain Damage do localStorage:", error);
    }
  }, [storageKey]);

  // Salvar no localStorage sempre que brainDamage mudar (mas só após primeira renderização)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    try {
      localStorage.setItem(storageKey, JSON.stringify(brainDamage));
    } catch (error) {
      console.error("Erro ao salvar Brain Damage no localStorage:", error);
    }
  }, [brainDamage, storageKey]);

  const handleCellClick = (position: BrainDamagePosition) => {
    setBrainDamage((prev) => {
      const currentValue = prev[position];
      const minValue = archetype.brainDamage[position];
      const newValue =
        currentValue >= MAX_BRAIN_DAMAGE ? minValue : currentValue + 1;

      return {
        ...prev,
        [position]: newValue,
      };
    });
  };

  const rollBrainDamage = () => {
    if (isRolling) return;

    setIsRolling(true);
    const positions: BrainDamagePosition[] = [
      "topLeft",
      "topRight",
      "middleLeft",
      "middleRight",
      "bottomLeft",
      "bottomRight",
    ];

    // Encontrar a posição final válida
    let finalPosition = -1;
    let attempts = 0;
    const maxAttempts = 20;

    while (attempts < maxAttempts) {
      const diceRoll = Math.floor(Math.random() * 6);
      const position = positions[diceRoll];

      if (brainDamage[position] < MAX_BRAIN_DAMAGE) {
        finalPosition = diceRoll + 1; // 1-6
        break;
      }
      attempts++;
    }

    // Se não encontrou posição válida, cancelar
    if (finalPosition === -1) {
      setIsRolling(false);
      return;
    }

    // Animação de rolagem
    let count = 0;
    const maxSpins = 10;

    const interval = setInterval(() => {
      setSelectedCell(Math.floor(Math.random() * 6) + 1);
      count++;

      if (count >= maxSpins) {
        clearInterval(interval);
        setSelectedCell(finalPosition);

        // Incrementar o brain damage após a animação
        const position = positions[finalPosition - 1];
        setBrainDamage((prev) => ({
          ...prev,
          [position]: prev[position] + 1,
        }));

        setIsRolling(false);

        // Limpar seleção após um tempo
        setTimeout(() => {
          setSelectedCell(null);
        }, 1500);
      }
    }, 80);
  };

  const canRollDamage = () => {
    const positions: BrainDamagePosition[] = [
      "topLeft",
      "topRight",
      "middleLeft",
      "middleRight",
      "bottomLeft",
      "bottomRight",
    ];

    return positions.some(
      (position) => brainDamage[position] < MAX_BRAIN_DAMAGE
    );
  };

  return {
    brainDamage,
    handleCellClick,
    rollBrainDamage,
    selectedCell,
    isRolling,
    canRollDamage: canRollDamage(),
  };
}
