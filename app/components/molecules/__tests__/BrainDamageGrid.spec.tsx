import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BrainDamageGrid from "../BrainDamageGrid";

describe("BrainDamageGrid", () => {
  const defaultProps = {
    topLeft: 0,
    topRight: 1,
    middleLeft: 2,
    middleRight: 3,
    bottomLeft: 4,
    bottomRight: 5,
  };

  it("deve renderizar todas as 6 células com os valores corretos", () => {
    render(<BrainDamageGrid {...defaultProps} />);

    expect(screen.getAllByText("0").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("1").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("2").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("3").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("4").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("5").length).toBeGreaterThanOrEqual(1);
  });

  it("deve renderizar os números das células (1-6)", () => {
    render(<BrainDamageGrid {...defaultProps} />);

    const cellNumbers = screen.getAllByText(/^[1-6]$/);
    // 6 números de células + 5 valores (1-5, pois 0 não corresponde ao regex) = 11
    expect(cellNumbers).toHaveLength(11);
  });

  it("deve chamar onCellClick com a posição correta", () => {
    const mockOnCellClick = jest.fn();
    render(<BrainDamageGrid {...defaultProps} onCellClick={mockOnCellClick} />);

    const buttons = screen
      .getAllByRole("button")
      .filter((btn) => !btn.textContent?.includes("Roll"));

    fireEvent.click(buttons[0]); // topLeft
    expect(mockOnCellClick).toHaveBeenCalledWith("topLeft");

    fireEvent.click(buttons[1]); // topRight
    expect(mockOnCellClick).toHaveBeenCalledWith("topRight");

    fireEvent.click(buttons[2]); // middleLeft
    expect(mockOnCellClick).toHaveBeenCalledWith("middleLeft");
  });

  it("deve chamar onContainerClick quando o container é clicado", () => {
    const mockOnContainerClick = jest.fn();
    const { container } = render(
      <BrainDamageGrid
        {...defaultProps}
        onContainerClick={mockOnContainerClick}
      />
    );

    const gridContainer = container.querySelector(
      ".cursor-pointer"
    ) as HTMLElement;
    fireEvent.click(gridContainer);

    expect(mockOnContainerClick).toHaveBeenCalledTimes(1);
  });

  it('deve aplicar estilo "on the edge" quando isOnTheEdge=true', () => {
    const { container } = render(
      <BrainDamageGrid {...defaultProps} isOnTheEdge={true} />
    );

    const gridContainer = container.querySelector(
      ".cursor-pointer"
    ) as HTMLElement;
    expect(gridContainer).toHaveClass("border-red-500", "shadow-red-500/50");
  });

  it("deve aplicar estilo normal quando isOnTheEdge=false", () => {
    const { container } = render(
      <BrainDamageGrid {...defaultProps} isOnTheEdge={false} />
    );

    const gridContainer = container.querySelector(
      ".cursor-pointer"
    ) as HTMLElement;
    expect(gridContainer).toHaveClass("border-purple-400");
  });

  it("deve marcar células como default quando valores correspondem aos defaultValues", () => {
    const defaultValues = {
      topLeft: 0,
      topRight: 1,
      middleLeft: 2,
      middleRight: 3,
      bottomLeft: 4,
      bottomRight: 5,
    };

    render(<BrainDamageGrid {...defaultProps} defaultValues={defaultValues} />);

    const buttons = screen
      .getAllByRole("button")
      .filter((btn) => !btn.textContent?.includes("Roll"));
    buttons.forEach((button) => {
      expect(button).toHaveClass("border-purple-300");
    });
  });

  it('deve renderizar botão "Rolar Dano"', () => {
    const mockOnRollDamage = jest.fn();
    render(
      <BrainDamageGrid {...defaultProps} onRollDamage={mockOnRollDamage} />
    );

    const rollButton = screen.getByRole("button", { name: /Rolar Dano/i });
    expect(rollButton).toBeInTheDocument();
  });

  it("deve chamar onRollDamage quando o botão é clicado", () => {
    const mockOnRollDamage = jest.fn();
    render(
      <BrainDamageGrid {...defaultProps} onRollDamage={mockOnRollDamage} />
    );

    const rollButton = screen.getByRole("button", { name: /Rolar Dano/i });
    fireEvent.click(rollButton);

    expect(mockOnRollDamage).toHaveBeenCalledTimes(1);
  });

  it('deve desabilitar o botão "Rolar Dano" quando canRollDamage=false', () => {
    const mockOnRollDamage = jest.fn();
    render(
      <BrainDamageGrid
        {...defaultProps}
        canRollDamage={false}
        onRollDamage={mockOnRollDamage}
      />
    );

    const rollButton = screen.getByRole("button", { name: /Rolar Dano/i });
    expect(rollButton).toBeDisabled();
  });

  it('deve habilitar o botão "Rolar Dano" quando canRollDamage=true', () => {
    const mockOnRollDamage = jest.fn();
    render(
      <BrainDamageGrid
        {...defaultProps}
        canRollDamage={true}
        onRollDamage={mockOnRollDamage}
      />
    );

    const rollButton = screen.getByRole("button", { name: /Rolar Dano/i });
    expect(rollButton).not.toBeDisabled();
  });

  it("deve destacar a célula selecionada", () => {
    render(<BrainDamageGrid {...defaultProps} selectedCell={3} />);

    const buttons = screen
      .getAllByRole("button")
      .filter((btn) => !btn.textContent?.includes("Roll"));
    expect(buttons[2]).toHaveClass("border-fuchsia-400"); // célula 3 (índice 2)
  });

  it("deve identificar células com valor máximo", () => {
    const maxValueProps = {
      topLeft: 6,
      topRight: 6,
      middleLeft: 6,
      middleRight: 3,
      bottomLeft: 4,
      bottomRight: 5,
    };

    render(<BrainDamageGrid {...maxValueProps} maxValue={6} />);

    const buttons = screen
      .getAllByRole("button")
      .filter((btn) => !btn.textContent?.includes("Roll"));
    expect(buttons[0]).toHaveClass("border-red-400"); // topLeft = 6
    expect(buttons[1]).toHaveClass("border-red-400"); // topRight = 6
    expect(buttons[2]).toHaveClass("border-red-400"); // middleLeft = 6
  });
});
