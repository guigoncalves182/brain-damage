import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ArchetypeSelector from "../ArchetypeSelector";
import Archetype from "@/app/archetype";

// Mock Next.js router
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockArchetypes: Archetype[] = [
  {
    _id: "1",
    id: "1",
    name: "Arquétipo 1",
    defect: "Defeito 1",
    characteristic: "Característica 1",
    flavorText: "Texto 1",
    diceRoll: ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"],
    backgroundImage: "/images/bg1.jpg",
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
  },
  {
    _id: "2",
    id: "2",
    name: "Arquétipo 2",
    defect: "Defeito 2",
    characteristic: "Característica 2",
    flavorText: "Texto 2",
    diceRoll: ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"],
    backgroundImage: "/images/bg2.jpg",
    brainDamage: {
      topLeft: 1,
      topRight: 2,
      middleLeft: 3,
      middleRight: 4,
      bottomLeft: 5,
      bottomRight: 6,
    },
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
    __v: 0,
  },
];

describe("ArchetypeSelector", () => {
  beforeEach(() => {
    mockPush.mockClear();
    localStorage.clear();
  });

  it("deve renderizar o ArchetypeSelect", () => {
    render(<ArchetypeSelector archetypes={mockArchetypes} />);

    expect(screen.getByText("Escolha um arquétipo:")).toBeInTheDocument();
  });

  it("deve navegar para a página do arquétipo ao selecionar", () => {
    render(<ArchetypeSelector archetypes={mockArchetypes} />);

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "1" } });

    expect(mockPush).toHaveBeenCalledWith("/archetype/1");
  });

  it("não deve mostrar botão de limpar quando não há dados salvos", () => {
    render(<ArchetypeSelector archetypes={mockArchetypes} />);

    const clearButton = screen.getByText("🗑️ Limpar Dados Salvos");
    expect(clearButton).toBeDisabled();
  });

  it("deve mostrar botão de limpar quando há dados salvos", async () => {
    localStorage.setItem("brain-damage-1", JSON.stringify({ topLeft: 3 }));

    render(<ArchetypeSelector archetypes={mockArchetypes} />);

    await waitFor(() => {
      expect(screen.getByText("🗑️ Limpar Dados Salvos")).toBeInTheDocument();
    });
  });

  it("deve limpar localStorage ao clicar no botão de limpar", async () => {
    localStorage.setItem("brain-damage-1", JSON.stringify({ topLeft: 3 }));
    localStorage.setItem("brain-damage-2", JSON.stringify({ topLeft: 4 }));

    // Mock window.confirm
    const mockConfirm = jest.spyOn(window, "confirm").mockReturnValue(true);

    render(<ArchetypeSelector archetypes={mockArchetypes} />);

    await waitFor(() => {
      expect(screen.getByText("🗑️ Limpar Dados Salvos")).toBeInTheDocument();
    });

    const clearButton = screen.getByText("🗑️ Limpar Dados Salvos");
    fireEvent.click(clearButton);

    expect(mockConfirm).toHaveBeenCalled();
    expect(localStorage.getItem("brain-damage-1")).toBeNull();
    expect(localStorage.getItem("brain-damage-2")).toBeNull();

    mockConfirm.mockRestore();
  });

  it("não deve limpar localStorage se o usuário cancelar", async () => {
    localStorage.setItem("brain-damage-1", JSON.stringify({ topLeft: 3 }));

    // Mock window.confirm to return false
    const mockConfirm = jest.spyOn(window, "confirm").mockReturnValue(false);

    render(<ArchetypeSelector archetypes={mockArchetypes} />);

    await waitFor(() => {
      expect(screen.getByText("🗑️ Limpar Dados Salvos")).toBeInTheDocument();
    });

    const clearButton = screen.getByText("🗑️ Limpar Dados Salvos");
    fireEvent.click(clearButton);

    expect(mockConfirm).toHaveBeenCalled();
    expect(localStorage.getItem("brain-damage-1")).not.toBeNull();

    mockConfirm.mockRestore();
  });

  it("deve renderizar o título", () => {
    render(<ArchetypeSelector archetypes={mockArchetypes} />);

    expect(screen.getByText("Brain Damage")).toBeInTheDocument();
  });

  it("deve renderizar múltiplos arquétipos no select", () => {
    render(<ArchetypeSelector archetypes={mockArchetypes} />);

    expect(screen.getByText("Arquétipo 1")).toBeInTheDocument();
    expect(screen.getByText("Arquétipo 2")).toBeInTheDocument();
  });
});
