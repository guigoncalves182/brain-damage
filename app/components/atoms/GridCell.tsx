interface GridCellProps {
  value: number;
  onClick?: () => void;
  isDefault?: boolean;
  isMaxValue?: boolean;
  cellNumber?: number;
  isSelected?: boolean;
}

export default function GridCell({
  value,
  onClick,
  isDefault = false,
  isMaxValue = false,
  cellNumber,
  isSelected = false,
}: GridCellProps) {
  const getColorClasses = () => {
    if (isSelected) {
      return "border-fuchsia-400 bg-fuchsia-500/30 text-fuchsia-100 shadow-lg shadow-fuchsia-500/50";
    }
    if (isMaxValue) {
      return "border-red-400 bg-red-500/30 text-red-100 hover:bg-red-500/40";
    }
    if (isDefault) {
      return "border-purple-300 bg-white/20 text-white hover:bg-white/30";
    }
    return "border-cyan-400 bg-cyan-500/30 text-cyan-100 hover:bg-cyan-500/40";
  };

  return (
    <button
      onClick={onClick}
      className={`relative flex aspect-square w-[18vw] max-w-[70px] items-center justify-center rounded border text-xl font-bold transition-all active:scale-95 sm:rounded-lg sm:border-2 sm:text-2xl md:text-3xl ${getColorClasses()}`}
      type="button"
    >
      {cellNumber && (
        <div className="absolute -left-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-white text-[8px] font-bold text-purple-600 sm:h-4 sm:w-4 sm:text-[9px]">
          {cellNumber}
        </div>
      )}
      {value}
    </button>
  );
}
