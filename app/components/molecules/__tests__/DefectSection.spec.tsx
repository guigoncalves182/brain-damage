import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import DefectSection from "../DefectSection";

describe("DefectSection", () => {
  it("deve renderizar o nome do arquétipo", () => {
    render(<DefectSection name="Test Archetype" />);

    expect(screen.getByText("Test Archetype")).toBeInTheDocument();
  });

  it("deve renderizar o defeito", () => {
    render(<DefectSection defect="Defeito Teste" />);

    expect(screen.getByText("Defeito")).toBeInTheDocument();
    expect(screen.getByText("Defeito Teste")).toBeInTheDocument();
  });

  it("deve renderizar a característica", () => {
    render(<DefectSection characteristic="Característica Teste" />);

    expect(screen.getByText("Característica")).toBeInTheDocument();
    expect(screen.getByText("Característica Teste")).toBeInTheDocument();
  });

  it("deve renderizar o flavor text quando showFlavorText=true", () => {
    render(<DefectSection flavorText="Texto de sabor" showFlavorText={true} />);

    expect(screen.getByText("Texto de sabor")).toBeInTheDocument();
  });

  it("não deve renderizar o flavor text quando showFlavorText=false", () => {
    render(
      <DefectSection flavorText="Texto de sabor" showFlavorText={false} />
    );

    expect(screen.queryByText("Texto de sabor")).not.toBeInTheDocument();
  });

  it("deve renderizar o botão de imagem quando onImageClick é fornecido", () => {
    const mockOnImageClick = jest.fn();
    render(<DefectSection name="Test" onImageClick={mockOnImageClick} />);

    const imageButton = screen.getByRole("button");
    expect(imageButton).toBeInTheDocument();
    expect(imageButton).toHaveTextContent("📸");
  });

  it("não deve renderizar o botão de imagem quando onImageClick não é fornecido", () => {
    render(<DefectSection name="Test" />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("deve chamar onImageClick quando o botão de imagem é clicado", () => {
    const mockOnImageClick = jest.fn();
    render(<DefectSection name="Test" onImageClick={mockOnImageClick} />);

    const imageButton = screen.getByRole("button");
    fireEvent.click(imageButton);

    expect(mockOnImageClick).toHaveBeenCalledTimes(1);
  });

  it("deve renderizar todos os campos juntos", () => {
    render(
      <DefectSection
        name="Arquétipo Completo"
        defect="Defeito Completo"
        characteristic="Característica Completa"
        flavorText="Texto Completo"
        showFlavorText={true}
      />
    );

    expect(screen.getByText("Arquétipo Completo")).toBeInTheDocument();
    expect(screen.getByText("Defeito Completo")).toBeInTheDocument();
    expect(screen.getByText("Característica Completa")).toBeInTheDocument();
    expect(screen.getByText("Texto Completo")).toBeInTheDocument();
  });

  it("não deve renderizar seções vazias", () => {
    render(<DefectSection />);

    expect(screen.queryByText("Defeito")).not.toBeInTheDocument();
    expect(screen.queryByText("Característica")).not.toBeInTheDocument();
  });
});
