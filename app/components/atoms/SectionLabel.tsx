interface SectionLabelProps {
  children: React.ReactNode;
}

export default function SectionLabel({ children }: SectionLabelProps) {
  return (
    <h3 className="mb-1 text-[10px] font-bold uppercase tracking-wide text-purple-200 sm:mb-1.5 sm:text-xs md:text-sm">
      {children}
    </h3>
  );
}
