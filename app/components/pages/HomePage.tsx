import archetypesData from "@/app/data/archetypes.json";
import HomeTemplate from "@/app/components/templates/HomeTemplate";
import Archetype from "@/app/archetype";

const archetypes = archetypesData as Archetype[];

export default function HomePage() {
  return <HomeTemplate archetypes={archetypes} />;
}
