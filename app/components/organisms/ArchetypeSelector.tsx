"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ArchetypeSelect from "../molecules/ArchetypeSelect";
import Archetype from "@/app/archetype";

interface ArchetypeSelectorProps {
  archetypes: Archetype[];
}

export default function ArchetypeSelector({
  archetypes,
}: ArchetypeSelectorProps) {
  const router = useRouter();
  const [hasStoredData, setHasStoredData] = useState(false);

  useEffect(() => {
    const checkStoredData = () => {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith("brain-damage-")) {
          setHasStoredData(true);
          return;
        }
      }
      setHasStoredData(false);
    };

    checkStoredData();
  }, []);

  const handleSelect = (id: string) => {
    router.push(`/archetype/${id}`);
  };

  const handleClearStorage = () => {
    const confirmed = window.confirm(
      "Tem certeza que deseja limpar todos os dados salvos de Brain Damage?"
    );

    if (confirmed) {
      try {
        // Limpar todas as chaves que começam com "brain-damage-"
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key?.startsWith("brain-damage-")) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach((key) => localStorage.removeItem(key));
        setHasStoredData(false);
        alert("Dados limpos com sucesso!");
      } catch (error) {
        console.error("Erro ao limpar localStorage:", error);
        alert("Erro ao limpar dados.");
      }
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <header className="mb-8 text-center sm:mb-12">
        <h1 className="mb-3 text-3xl font-bold text-white sm:mb-4 sm:text-4xl md:text-5xl">
          Brain Damage
        </h1>
        <p className="text-base text-purple-300 sm:text-lg md:text-xl">
          Selecione seu Arquétipo
        </p>
      </header>

      <ArchetypeSelect archetypes={archetypes} onSelect={handleSelect} />

      <button
        onClick={handleClearStorage}
        disabled={!hasStoredData}
        className="mt-4 w-full rounded-lg border-2 border-red-400/50 bg-red-500/20 px-4 py-2 text-sm font-medium text-red-200 transition-all hover:border-red-400 hover:bg-red-500/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-red-400/50 disabled:hover:bg-red-500/20 sm:mt-6 sm:text-base"
        type="button"
      >
        🗑️ Limpar Dados Salvos
      </button>

      <div className="mt-6 rounded-xl border border-purple-400/30 bg-black/20 p-4 backdrop-blur-sm sm:mt-8">
        <p className="text-center text-xs text-purple-300 sm:text-sm">
          Cada arquétipo possui características únicas, defeitos e habilidades
          especiais
        </p>
      </div>
    </div>
  );
}
