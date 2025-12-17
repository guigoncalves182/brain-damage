import Archetype from "@/app/archetype.interface";
import ArchetypeDetailTemplate from "@/app/components/templates/ArchetypeDetailTemplate";

interface ArchetypeDetailPageProps {
  archetype: Archetype;
}

export default function ArchetypeDetailPage({
  archetype,
}: ArchetypeDetailPageProps) {
  return <ArchetypeDetailTemplate archetype={archetype} />;
}
