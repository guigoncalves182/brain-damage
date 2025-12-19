import React from "react";
import { render, screen } from "@testing-library/react";
import SectionLabel from "../SectionLabel";

describe("SectionLabel", () => {
  it("deve renderizar o label corretamente", () => {
    render(<SectionLabel>Defeito</SectionLabel>);

    const label = screen.getByText("Defeito");
    expect(label).toBeInTheDocument();
  });

  it("deve aplicar as classes CSS corretas", () => {
    render(<SectionLabel>Teste</SectionLabel>);

    const label = screen.getByText("Teste");
    expect(label).toHaveClass("font-bold", "uppercase", "text-purple-200");
  });

  it("deve renderizar elementos React como children", () => {
    render(
      <SectionLabel>
        <span data-testid="child">Label Filho</span>
      </SectionLabel>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
    expect(screen.getByText("Label Filho")).toBeInTheDocument();
  });
});
