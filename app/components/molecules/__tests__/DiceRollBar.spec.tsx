import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DiceRollBar from "../DiceRollBar";

describe("DiceRollBar", () => {
  const mockDiceRoll: [string, string, string, string, string, string] = [
    "⚀",
    "⚁",
    "⚂",
    "⚃",
    "⚄",
    "⚅",
  ];
  const mockOnRoll = jest.fn();
  const mockOnReset = jest.fn();

  beforeEach(() => {
    mockOnRoll.mockClear();
    mockOnReset.mockClear();
  });

  it("deve renderizar todos os 6 dados", () => {
    render(<DiceRollBar diceRoll={mockDiceRoll} />);

    expect(screen.getByText("⚀")).toBeInTheDocument();
    expect(screen.getByText("⚁")).toBeInTheDocument();
    expect(screen.getByText("⚂")).toBeInTheDocument();
    expect(screen.getByText("⚃")).toBeInTheDocument();
    expect(screen.getByText("⚄")).toBeInTheDocument();
    expect(screen.getByText("⚅")).toBeInTheDocument();
  });

  it("deve renderizar números de 1 a 6 nos dados", () => {
    render(<DiceRollBar diceRoll={mockDiceRoll} />);

    for (let i = 1; i <= 6; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
  });

  it("deve chamar onRoll quando o botão de rolar é clicado", () => {
    render(<DiceRollBar diceRoll={mockDiceRoll} onRoll={mockOnRoll} />);

    const rollButtons = screen.getAllByTitle("Rolar dado (1d6)");
    fireEvent.click(rollButtons[0]);

    expect(mockOnRoll).toHaveBeenCalledTimes(1);
  });

  it("deve chamar onReset quando o botão de resetar é clicado", () => {
    render(
      <DiceRollBar
        diceRoll={mockDiceRoll}
        selectedIndex={3}
        onReset={mockOnReset}
      />
    );

    const resetButtons = screen.getAllByTitle("Resetar resultado");
    fireEvent.click(resetButtons[0]);

    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });

  it("deve desabilitar o botão reset quando selectedIndex é null", () => {
    render(
      <DiceRollBar
        diceRoll={mockDiceRoll}
        selectedIndex={null}
        onReset={mockOnReset}
      />
    );

    const resetButtons = screen.getAllByTitle("Resetar resultado");
    resetButtons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  it("deve habilitar o botão reset quando selectedIndex tem um valor", () => {
    render(
      <DiceRollBar
        diceRoll={mockDiceRoll}
        selectedIndex={4}
        onReset={mockOnReset}
      />
    );

    const resetButtons = screen.getAllByTitle("Resetar resultado");
    resetButtons.forEach((button) => {
      expect(button).not.toBeDisabled();
    });
  });

  it("deve destacar o dado correto quando selectedIndex é fornecido", () => {
    const { container } = render(
      <DiceRollBar diceRoll={mockDiceRoll} selectedIndex={3} />
    );

    // O terceiro dado (selectedIndex 3) deve estar destacado
    const highlightedSlots = container.querySelectorAll(".border-cyan-400");
    expect(highlightedSlots.length).toBeGreaterThan(0);
  });

  it("não deve destacar nenhum dado quando selectedIndex é null", () => {
    const { container } = render(
      <DiceRollBar diceRoll={mockDiceRoll} selectedIndex={null} />
    );

    const allSlots = container.querySelectorAll(".border-cyan-400");
    expect(allSlots.length).toBe(0);
  });

  it("deve renderizar botões de controle (roll e reset)", () => {
    render(
      <DiceRollBar
        diceRoll={mockDiceRoll}
        selectedIndex={2}
        onRoll={mockOnRoll}
        onReset={mockOnReset}
      />
    );

    expect(screen.getAllByTitle("Rolar dado (1d6)").length).toBeGreaterThan(0);
    expect(screen.getAllByTitle("Resetar resultado").length).toBeGreaterThan(0);
  });
});
