import React from "react";
import { render, screen } from "@testing-library/react";
import ArchetypeTitle from "../ArchetypeTitle";

describe("ArchetypeTitle", () => {
  it("deve renderizar o título corretamente", () => {
    render(<ArchetypeTitle>Teste de Título</ArchetypeTitle>);

    const title = screen.getByText("Teste de Título");
    expect(title).toBeInTheDocument();
  });

  it("deve aplicar as classes CSS corretas", () => {
    render(<ArchetypeTitle>Título</ArchetypeTitle>);

    const title = screen.getByText("Título");
    expect(title).toHaveClass(
      "text-center",
      "font-bold",
      "uppercase",
      "text-white"
    );
  });

  it("deve renderizar elementos React como children", () => {
    render(
      <ArchetypeTitle>
        <span data-testid="child">Conteúdo Filho</span>
      </ArchetypeTitle>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo Filho")).toBeInTheDocument();
  });
});
