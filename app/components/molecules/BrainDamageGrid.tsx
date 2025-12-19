import GridCell from "../atoms/GridCell";

interface BrainDamageGridProps {
  topLeft: number;
  topRight: number;
  middleLeft: number;
  middleRight: number;
  bottomLeft: number;
  bottomRight: number;
  defaultValues?: {
    topLeft: number;
    topRight: number;
    middleLeft: number;
    middleRight: number;
    bottomLeft: number;
    bottomRight: number;
  };
  maxValue?: number;
  onCellClick?: (
    position:
      | "topLeft"
      | "topRight"
      | "middleLeft"
      | "middleRight"
      | "bottomLeft"
      | "bottomRight"
  ) => void;
  onContainerClick?: () => void;
  onRollDamage?: () => void;
  selectedCell?: number | null;
  canRollDamage?: boolean;
  isOnTheEdge?: boolean;
}

export default function BrainDamageGrid({
  topLeft,
  topRight,
  middleLeft,
  middleRight,
  bottomLeft,
  bottomRight,
  defaultValues,
  maxValue = 6,
  onCellClick,
  onContainerClick,
  onRollDamage,
  selectedCell,
  canRollDamage = true,
  isOnTheEdge = false,
}: BrainDamageGridProps) {
  return (
    <div className="flex flex-col gap-2">
      <div
        onClick={onContainerClick}
        className={`w-fit cursor-pointer rounded-lg border-2 bg-white/10 p-1 backdrop-blur-sm transition-all sm:rounded-xl sm:border-4 sm:p-1.5 ${
          isOnTheEdge
            ? "border-red-500 shadow-lg shadow-red-500/50 hover:border-red-400"
            : "border-purple-400 hover:border-purple-300"
        }`}
      >
        <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
          <GridCell
            value={topLeft}
            onClick={() => onCellClick?.("topLeft")}
            isDefault={
              defaultValues ? topLeft === defaultValues.topLeft : false
            }
            isMaxValue={topLeft >= maxValue}
            cellNumber={1}
            isSelected={selectedCell === 1}
          />
          <GridCell
            value={topRight}
            onClick={() => onCellClick?.("topRight")}
            isDefault={
              defaultValues ? topRight === defaultValues.topRight : false
            }
            isMaxValue={topRight >= maxValue}
            cellNumber={2}
            isSelected={selectedCell === 2}
          />
          <GridCell
            value={middleLeft}
            onClick={() => onCellClick?.("middleLeft")}
            isDefault={
              defaultValues ? middleLeft === defaultValues.middleLeft : false
            }
            isMaxValue={middleLeft >= maxValue}
            cellNumber={3}
            isSelected={selectedCell === 3}
          />
          <GridCell
            value={middleRight}
            onClick={() => onCellClick?.("middleRight")}
            isDefault={
              defaultValues ? middleRight === defaultValues.middleRight : false
            }
            isMaxValue={middleRight >= maxValue}
            cellNumber={4}
            isSelected={selectedCell === 4}
          />
          <GridCell
            value={bottomLeft}
            onClick={() => onCellClick?.("bottomLeft")}
            isDefault={
              defaultValues ? bottomLeft === defaultValues.bottomLeft : false
            }
            isMaxValue={bottomLeft >= maxValue}
            cellNumber={5}
            isSelected={selectedCell === 5}
          />
          <GridCell
            value={bottomRight}
            onClick={() => onCellClick?.("bottomRight")}
            isDefault={
              defaultValues ? bottomRight === defaultValues.bottomRight : false
            }
            isMaxValue={bottomRight >= maxValue}
            cellNumber={6}
            isSelected={selectedCell === 6}
          />
        </div>
      </div>
      {onRollDamage && (
        <button
          onClick={onRollDamage}
          className="flex w-full items-center justify-center gap-1 rounded-lg border-2 border-purple-400 bg-purple-500/30 px-3 py-2 text-sm font-bold text-white transition-all hover:bg-purple-500/50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
          type="button"
          title="Rolar dano cerebral (1d6)"
          disabled={!canRollDamage}
        >
          🎲 Rolar Dano
        </button>
      )}
    </div>
  );
}
