"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BrainDamageGrid from "../molecules/BrainDamageGrid";
import DiceRollBar from "../molecules/DiceRollBar";
import DefectSection from "../molecules/DefectSection";
import ImageModal from "../atoms/ImageModal";
import { useDiceRoll } from "@/app/hooks/useDiceRoll";
import { useBrainDamage } from "@/app/hooks/useBrainDamage";
import Archetype from "@/app/archetype";

interface ArchetypeCardProps {
  archetype: Archetype;
  variant?: "grid" | "full";
}

export default function ArchetypeCard({
  archetype,
  variant = "grid",
}: ArchetypeCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    brainDamage,
    handleCellClick,
    rollBrainDamage,
    selectedCell,
    canRollDamage,
  } = useBrainDamage(archetype);
  const { diceResult, rollDice, resetDice } = useDiceRoll();

  const cardContent = (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900 to-purple-600 shadow-2xl">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={archetype.backgroundImage}
          alt={archetype.name}
          fill
          className="object-cover opacity-60"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
          }}
        />
        {/* Vignette overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col p-3 sm:p-4 md:p-5">
        <div className="flex-1">
          <DiceRollBar
            diceRoll={archetype.diceRoll}
            selectedIndex={diceResult}
            onRoll={rollDice}
            onReset={resetDice}
          />
        </div>

        {/* Brain Damage + Defect Section */}
        <div className="flex flex-col-reverse items-end gap-2 sm:flex-row sm:items-end sm:gap-3 md:gap-4">
          <div className="w-full sm:flex-1">
            <DefectSection
              name={archetype.name}
              defect={archetype.defect}
              characteristic={archetype.characteristic}
              flavorText={archetype.flavorText}
              showFlavorText={variant === "full"}
              onImageClick={() => setIsModalOpen(true)}
            />
          </div>

          <div className="flex-shrink-0">
            <BrainDamageGrid
              topLeft={brainDamage.topLeft}
              topRight={brainDamage.topRight}
              middleLeft={brainDamage.middleLeft}
              middleRight={brainDamage.middleRight}
              bottomLeft={brainDamage.bottomLeft}
              bottomRight={brainDamage.bottomRight}
              defaultValues={archetype.brainDamage}
              maxValue={Number(process.env.NEXT_PUBLIC_MAX_BRAIN_DAMAGE) || 6}
              onCellClick={handleCellClick}
              onRollDamage={rollBrainDamage}
              selectedCell={selectedCell}
              canRollDamage={canRollDamage}
            />
          </div>
        </div>
      </div>
    </div>
  );

  if (variant === "grid") {
    return (
      <>
        <Link
          href={`/archetype/${archetype.id}`}
          className="block h-full transition-transform hover:scale-105"
        >
          {cardContent}
        </Link>
        <ImageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          imageSrc={archetype.backgroundImage}
          imageAlt={archetype.name}
        />
      </>
    );
  }

  return (
    <>
      {cardContent}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={archetype.backgroundImage}
        imageAlt={archetype.name}
      />
    </>
  );
}
