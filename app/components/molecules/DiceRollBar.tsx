import DiceSlot from "../atoms/DiceSlot";

interface DiceRollBarProps {
  diceRoll: [string, string, string, string, string, string];
  selectedIndex?: number | null;
  onRoll?: () => void;
  onReset?: () => void;
}

export default function DiceRollBar({
  diceRoll,
  selectedIndex,
  onRoll,
  onReset,
}: DiceRollBarProps) {
  return (
    <div className="flex w-full flex-col items-start gap-2 sm:mx-auto sm:w-fit sm:flex-row sm:items-center sm:gap-3">
      {/* Botão Reset - Desktop (esquerda) */}
      <button
        onClick={onReset}
        className="hidden sm:flex h-10 w-10 items-center justify-center rounded-lg border-4 border-purple-400 bg-purple-500/30 text-2xl text-white transition-all hover:bg-purple-500/50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        title="Resetar resultado"
        disabled={selectedIndex === null}
      >
        ↺
      </button>

      {/* Barra de dados */}
      <div className="rounded-lg border-2 border-purple-400 bg-white/10 p-1 backdrop-blur-sm sm:rounded-xl sm:border-4 sm:p-1.5">
        <div className="flex gap-0.5 sm:gap-1">
          {diceRoll.map((dice, index) => (
            <DiceSlot
              key={index}
              icon={dice}
              isSelected={selectedIndex === index + 1}
              diceNumber={index + 1}
            />
          ))}
        </div>
      </div>

      {/* Botão Roll - Desktop (direita) */}
      <button
        onClick={onRoll}
        className="hidden sm:flex h-10 w-10 items-center justify-center rounded-lg border-4 border-purple-400 bg-purple-500/30 text-2xl text-white transition-all hover:bg-purple-500/50 active:scale-95"
        type="button"
        title="Rolar dado (1d6)"
      >
        🎲
      </button>

      {/* Botões Mobile - juntos abaixo */}
      <div className="flex gap-2 sm:hidden">
        <button
          onClick={onReset}
          className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-purple-400 bg-purple-500/30 text-xl text-white transition-all hover:bg-purple-500/50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          title="Resetar resultado"
          disabled={selectedIndex === null}
        >
          ↺
        </button>
        <button
          onClick={onRoll}
          className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-purple-400 bg-purple-500/30 text-xl text-white transition-all hover:bg-purple-500/50 active:scale-95"
          type="button"
          title="Rolar dado (1d6)"
        >
          🎲
        </button>
      </div>
    </div>
  );
}
