interface ArchetypeTitleProps {
  children: React.ReactNode;
}

export default function ArchetypeTitle({ children }: ArchetypeTitleProps) {
  return (
    <h2 className="mb-2 text-center text-lg font-bold uppercase tracking-wider text-white sm:text-xl md:mb-3 md:text-2xl">
      {children}
    </h2>
  );
}
