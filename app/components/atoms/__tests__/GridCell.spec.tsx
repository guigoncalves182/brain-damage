import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GridCell from "../GridCell";

describe("GridCell", () => {
  it("deve renderizar o valor corretamente", () => {
    render(<GridCell value={3} />);

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("deve chamar onClick quando clicado", () => {
    const handleClick = jest.fn();
    render(<GridCell value={2} onClick={handleClick} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("deve mostrar o número da célula quando fornecido", () => {
    render(<GridCell value={4} cellNumber={5} />);

    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
  });

  it("deve aplicar estilo padrão quando isDefault=true", () => {
    const { container } = render(<GridCell value={0} isDefault={true} />);

    const button = container.querySelector("button") as HTMLElement;
    expect(button).toHaveClass("border-purple-300", "bg-white/20");
  });

  it("deve aplicar estilo modificado quando isDefault=false", () => {
    const { container } = render(<GridCell value={3} isDefault={false} />);

    const button = container.querySelector("button") as HTMLElement;
    expect(button).toHaveClass("border-cyan-400", "bg-cyan-500/30");
  });

  it("deve aplicar estilo de valor máximo quando isMaxValue=true", () => {
    const { container } = render(<GridCell value={6} isMaxValue={true} />);

    const button = container.querySelector("button") as HTMLElement;
    expect(button).toHaveClass("border-red-400", "bg-red-500/30");
  });

  it("deve aplicar estilo de seleção quando isSelected=true", () => {
    const { container } = render(<GridCell value={3} isSelected={true} />);

    const button = container.querySelector("button") as HTMLElement;
    expect(button).toHaveClass("border-fuchsia-400", "bg-fuchsia-500/30");
  });

  it("deve priorizar estilo de seleção sobre outros estilos", () => {
    const { container } = render(
      <GridCell
        value={6}
        isSelected={true}
        isMaxValue={true}
        isDefault={true}
      />
    );

    const button = container.querySelector("button") as HTMLElement;
    expect(button).toHaveClass("border-fuchsia-400", "bg-fuchsia-500/30");
  });

  it("não deve mostrar o número da célula quando cellNumber não é fornecido", () => {
    render(<GridCell value={2} />);

    // Deve ter o valor principal
    expect(screen.getByText("2")).toBeInTheDocument();
    // Mas não deve ter um círculo com número adicional (o cellNumber)
    const circles = document.querySelectorAll(".absolute.-left-1.-top-1");
    expect(circles.length).toBe(0);
  });
});
