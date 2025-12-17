interface DiceSlotProps {
  icon: string;
  isSelected?: boolean;
  diceNumber?: number;
}

export default function DiceSlot({
  icon,
  isSelected = false,
  diceNumber,
}: DiceSlotProps) {
  return (
    <div
      className={`relative flex aspect-square w-[13vw] max-w-[55px] items-center justify-center rounded border text-base transition-all sm:rounded-lg sm:border-2 sm:text-lg md:text-xl ${
        isSelected
          ? "border-cyan-400 bg-cyan-500/30 text-cyan-100 shadow-lg shadow-cyan-500/50"
          : "border-purple-300 bg-white/20 text-white"
      }`}
    >
      {diceNumber && (
        <div className="absolute -left-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white text-[8px] font-bold text-purple-600 sm:h-4 sm:w-4 sm:text-[9px]">
          {diceNumber}
        </div>
      )}
      {icon}
    </div>
  );
}
