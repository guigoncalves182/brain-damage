import SectionLabel from "../atoms/SectionLabel";

interface DefectSectionProps {
  name?: string;
  defect?: string;
  characteristic?: string;
  flavorText?: string;
  showFlavorText?: boolean;
  onImageClick?: () => void;
}

export default function DefectSection({
  name,
  defect,
  characteristic,
  flavorText,
  showFlavorText = false,
  onImageClick,
}: DefectSectionProps) {
  return (
    <div className="h-full space-y-2 rounded-lg border border-purple-300 bg-black/40 p-2.5 backdrop-blur-sm sm:space-y-3 sm:rounded-xl sm:border-2 sm:p-3 md:p-4">
      {name && (
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-center text-lg font-bold text-white drop-shadow-lg sm:text-xl md:text-2xl">
            {name}
          </h2>
          {onImageClick && (
            <button
              onClick={onImageClick}
              className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-purple-400/50 bg-purple-500/30 text-base transition-all hover:border-purple-400 hover:bg-purple-500/50 active:scale-95 sm:h-9 sm:w-9 sm:text-lg"
              type="button"
              title="Ver imagem do arquétipo"
            >
              📸
            </button>
          )}
        </div>
      )}

      {defect && (
        <div>
          <SectionLabel>Defeito</SectionLabel>
          <p className="text-[11px] leading-snug text-white sm:text-xs sm:leading-relaxed md:text-sm">
            {defect}
          </p>
        </div>
      )}

      {characteristic && (
        <div>
          <SectionLabel>Característica</SectionLabel>
          <p className="text-[11px] leading-snug text-white sm:text-xs sm:leading-relaxed md:text-sm">
            {characteristic}
          </p>
        </div>
      )}

      {showFlavorText && flavorText && (
        <p className="border-t border-purple-300/30 pt-2 text-[10px] italic text-purple-200 sm:pt-2 sm:text-xs md:text-sm">
          {flavorText}
        </p>
      )}
    </div>
  );
}
