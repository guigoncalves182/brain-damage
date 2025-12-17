"use client";

import Archetype from "@/app/archetype.interface";

interface ArchetypeSelectProps {
  archetypes: Archetype[];
  onSelect: (id: string) => void;
}

export default function ArchetypeSelect({
  archetypes,
  onSelect,
}: ArchetypeSelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (selectedId) {
      onSelect(selectedId);
    }
  };

  return (
    <div className="rounded-2xl border-2 border-purple-400 bg-black/40 p-6 backdrop-blur-sm sm:p-8">
      <label
        htmlFor="archetype-select"
        className="mb-3 block text-sm font-semibold uppercase tracking-wide text-purple-200 sm:text-base"
      >
        Escolha um arquétipo:
      </label>
      <select
        id="archetype-select"
        onChange={handleChange}
        defaultValue=""
        className="w-full rounded-lg border-2 border-purple-400 bg-purple-900/50 px-4 py-3 text-base text-white transition-colors hover:bg-purple-900/70 focus:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-300/50 sm:py-4 sm:text-lg"
      >
        <option value="" disabled>
          -- Selecione --
        </option>
        {archetypes.map((archetype) => (
          <option key={archetype.id} value={archetype.id}>
            {archetype.name}
          </option>
        ))}
      </select>
    </div>
  );
}
