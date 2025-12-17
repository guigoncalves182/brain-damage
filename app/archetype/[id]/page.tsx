import { notFound } from "next/navigation";
import archetypesData from "@/app/data/archetypes.json";
import ArchetypeDetailPage from "@/app/components/pages/ArchetypeDetailPage";
import Archetype from "@/app/archetype";

const archetypes = archetypesData as Archetype[];

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ArchetypePage({ params }: PageProps) {
  const { id } = await params;
  const archetype = archetypes.find((a) => a.id === id);

  if (!archetype) {
    notFound();
  }

  return <ArchetypeDetailPage archetype={archetype} />;
}

export async function generateStaticParams() {
  return archetypes.map((archetype) => ({
    id: archetype.id,
  }));
}
