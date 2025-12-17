import Archetype from "@/app/archetype";
import ArchetypeSelector from "../organisms/ArchetypeSelector";

interface HomeTemplateProps {
  archetypes: Archetype[];
}

export default function HomeTemplate({ archetypes }: HomeTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-purple-950 to-zinc-900 px-4 py-8 sm:py-12">
      <ArchetypeSelector archetypes={archetypes} />
    </div>
  );
}
