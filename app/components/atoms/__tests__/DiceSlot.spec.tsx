import React from "react";
import { render, screen } from "@testing-library/react";
import DiceSlot from "../DiceSlot";

describe("DiceSlot", () => {
  it("deve renderizar o ícone corretamente", () => {
    render(<DiceSlot icon="⚀" />);

    expect(screen.getByText("⚀")).toBeInTheDocument();
  });

  it("deve mostrar o número do dado quando fornecido", () => {
    render(<DiceSlot icon="⚀" diceNumber={1} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("⚀")).toBeInTheDocument();
  });

  it("deve aplicar estilo de seleção quando isSelected=true", () => {
    const { container } = render(<DiceSlot icon="⚀" isSelected={true} />);

    const slot = container.firstChild as HTMLElement;
    expect(slot).toHaveClass("border-cyan-400", "bg-cyan-500/30");
  });

  it("deve aplicar estilo padrão quando isSelected=false", () => {
    const { container } = render(<DiceSlot icon="⚀" isSelected={false} />);

    const slot = container.firstChild as HTMLElement;
    expect(slot).toHaveClass("border-purple-300", "bg-white/20");
  });

  it("não deve mostrar o número quando diceNumber não é fornecido", () => {
    render(<DiceSlot icon="⚀" />);

    expect(screen.queryByText("1")).not.toBeInTheDocument();
    expect(screen.getByText("⚀")).toBeInTheDocument();
  });

  it("deve renderizar múltiplos dados com números diferentes", () => {
    const { rerender } = render(<DiceSlot icon="⚀" diceNumber={1} />);
    expect(screen.getByText("1")).toBeInTheDocument();

    rerender(<DiceSlot icon="⚁" diceNumber={2} />);
    expect(screen.getByText("2")).toBeInTheDocument();

    rerender(<DiceSlot icon="⚅" diceNumber={6} />);
    expect(screen.getByText("6")).toBeInTheDocument();
  });
});
