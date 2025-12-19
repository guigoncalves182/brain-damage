import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ArchetypeSelect from "../ArchetypeSelect";
import Archetype from "@/app/archetype";

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

describe("ArchetypeSelect", () => {
  const mockOnSelect = jest.fn();

  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  it("deve renderizar o label corretamente", () => {
    render(
      <ArchetypeSelect archetypes={mockArchetypes} onSelect={mockOnSelect} />
    );

    expect(screen.getByText("Escolha um arquétipo:")).toBeInTheDocument();
  });

  it("deve renderizar a opção padrão", () => {
    render(
      <ArchetypeSelect archetypes={mockArchetypes} onSelect={mockOnSelect} />
    );

    expect(screen.getByText("-- Selecione --")).toBeInTheDocument();
  });

  it("deve renderizar todos os arquétipos na lista", () => {
    render(
      <ArchetypeSelect archetypes={mockArchetypes} onSelect={mockOnSelect} />
    );

    expect(screen.getByText("Arquétipo 1")).toBeInTheDocument();
    expect(screen.getByText("Arquétipo 2")).toBeInTheDocument();
  });

  it("deve chamar onSelect com o ID correto quando uma opção é selecionada", () => {
    render(
      <ArchetypeSelect archetypes={mockArchetypes} onSelect={mockOnSelect} />
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "1" } });

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith("1");
  });

  it("não deve chamar onSelect quando a opção padrão é selecionada", () => {
    render(
      <ArchetypeSelect archetypes={mockArchetypes} onSelect={mockOnSelect} />
    );

    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "" } });

    expect(mockOnSelect).not.toHaveBeenCalled();
  });

  it("deve renderizar o select com as classes CSS corretas", () => {
    render(
      <ArchetypeSelect archetypes={mockArchetypes} onSelect={mockOnSelect} />
    );

    const select = screen.getByRole("combobox");
    expect(select).toHaveClass(
      "bg-purple-900/50",
      "text-white",
      "border-purple-400"
    );
  });

  it("deve renderizar lista vazia sem erros", () => {
    render(<ArchetypeSelect archetypes={[]} onSelect={mockOnSelect} />);

    expect(screen.getByText("-- Selecione --")).toBeInTheDocument();
    expect(
      screen.queryByRole("option", { name: /Arquétipo/ })
    ).not.toBeInTheDocument();
  });
});
