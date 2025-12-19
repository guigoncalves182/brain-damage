import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ArchetypeCard from "../ArchetypeCard";
import Archetype from "@/app/archetype";

// Mock hooks
jest.mock("@/app/hooks/useDiceRoll", () => ({
  useDiceRoll: () => ({
    diceResult: null,
    rollDice: jest.fn(),
    resetDice: jest.fn(),
  }),
}));

jest.mock("@/app/hooks/useBrainDamage", () => ({
  useBrainDamage: () => ({
    brainDamage: {
      topLeft: 0,
      topRight: 1,
      middleLeft: 2,
      middleRight: 3,
      bottomLeft: 4,
      bottomRight: 5,
    },
    handleCellClick: jest.fn(),
    rollBrainDamage: jest.fn(),
    selectedCell: null,
    canRollDamage: true,
    isOnTheEdge: false,
  }),
}));

// Mock Next.js components
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

const mockArchetype: Archetype = {
  _id: "test-id",
  id: "test",
  name: "Test Archetype",
  defect: "Test Defect",
  characteristic: "Test Characteristic",
  flavorText: "Test Flavor Text",
  diceRoll: ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"],
  backgroundImage: "/images/test-bg.jpg",
  brainDamage: {
    topLeft: 0,
    topRight: 1,
    middleLeft: 2,
    middleRight: 3,
    bottomLeft: 4,
    bottomRight: 5,
  },
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
  __v: 0,
};

describe("ArchetypeCard", () => {
  it("deve renderizar o card em modo grid por padrão", () => {
    render(<ArchetypeCard archetype={mockArchetype} />);

    expect(screen.getByText("Test Archetype")).toBeInTheDocument();
  });

  it("deve renderizar o card em modo full", () => {
    render(<ArchetypeCard archetype={mockArchetype} variant="full" />);

    expect(screen.getByText("Test Archetype")).toBeInTheDocument();
    expect(screen.getByText("Test Defect")).toBeInTheDocument();
  });

  it("deve renderizar o DiceRollBar", () => {
    render(<ArchetypeCard archetype={mockArchetype} />);

    expect(screen.getByText("⚀")).toBeInTheDocument();
    expect(screen.getByText("⚅")).toBeInTheDocument();
  });

  it("deve renderizar o BrainDamageGrid", () => {
    render(<ArchetypeCard archetype={mockArchetype} />);

    const rollButton = screen.getByRole("button", { name: /Rolar Dano/i });
    expect(rollButton).toBeInTheDocument();
  });

  it("deve renderizar o DefectSection", () => {
    render(<ArchetypeCard archetype={mockArchetype} variant="full" />);

    expect(screen.getByText("Defeito")).toBeInTheDocument();
    expect(screen.getByText("Característica")).toBeInTheDocument();
  });

  it("deve renderizar a imagem de fundo", () => {
    render(<ArchetypeCard archetype={mockArchetype} />);

    const bgImage = screen.getByAltText("Test Archetype");
    expect(bgImage).toHaveAttribute("src", "/images/test-bg.jpg");
  });

  it("deve abrir o modal ao clicar no botão de imagem", async () => {
    render(<ArchetypeCard archetype={mockArchetype} variant="full" />);

    const imageButton = screen.getByText("📸");
    fireEvent.click(imageButton);

    await waitFor(() => {
      // Verifica se temos 2 imagens (background + modal)
      const images = screen.getAllByAltText("Test Archetype");
      expect(images.length).toBeGreaterThan(1);
    });
  });

  it("deve renderizar como link em modo grid", () => {
    const { container } = render(
      <ArchetypeCard archetype={mockArchetype} variant="grid" />
    );

    const link = container.querySelector('a[href="/archetype/test"]');
    expect(link).toBeInTheDocument();
  });

  it("não deve renderizar como link em modo full", () => {
    const { container } = render(
      <ArchetypeCard archetype={mockArchetype} variant="full" />
    );

    const link = container.querySelector("a");
    expect(link).not.toBeInTheDocument();
  });

  it("deve renderizar flavor text apenas em modo full", () => {
    const { rerender } = render(
      <ArchetypeCard archetype={mockArchetype} variant="grid" />
    );
    expect(screen.queryByText("Test Flavor Text")).not.toBeInTheDocument();

    rerender(<ArchetypeCard archetype={mockArchetype} variant="full" />);
    expect(screen.getByText("Test Flavor Text")).toBeInTheDocument();
  });
});
