import Link from "next/link";
import ArchetypeCard from "../organisms/ArchetypeCard";
import Archetype from "@/app/archetype";

interface ArchetypeDetailTemplateProps {
  archetype: Archetype;
}

export default function ArchetypeDetailTemplate({
  archetype,
}: ArchetypeDetailTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-purple-950 to-zinc-900 px-4 py-6 sm:py-12">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-purple-300 transition-colors hover:text-purple-100 sm:mb-8 sm:text-base"
        >
          <svg
            className="h-4 w-4 sm:h-5 sm:w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Voltar para seleção
        </Link>

        <div className="min-h-[500px] sm:h-[600px] lg:h-[700px]">
          <ArchetypeCard archetype={archetype} variant="full" />
        </div>
      </div>
    </div>
  );
}
