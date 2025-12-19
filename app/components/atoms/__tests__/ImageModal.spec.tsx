import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ImageModal from "../ImageModal";

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

describe("ImageModal", () => {
  const mockOnClose = jest.fn();
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    imageSrc: "/images/test.jpg",
    imageAlt: "Test Image",
  };

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it("não deve renderizar quando isOpen=false", () => {
    render(<ImageModal {...defaultProps} isOpen={false} />);

    expect(screen.queryByAltText("Test Image")).not.toBeInTheDocument();
  });

  it("deve renderizar quando isOpen=true", () => {
    render(<ImageModal {...defaultProps} />);

    expect(screen.getByAltText("Test Image")).toBeInTheDocument();
  });

  it("deve chamar onClose ao clicar no botão fechar", () => {
    render(<ImageModal {...defaultProps} />);

    const closeButton = screen.getByLabelText("Fechar");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("deve chamar onClose ao clicar no backdrop", () => {
    render(<ImageModal {...defaultProps} />);

    const backdrop = screen.getByAltText("Test Image").parentElement
      ?.parentElement as HTMLElement;
    fireEvent.click(backdrop);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("não deve chamar onClose ao clicar na imagem", () => {
    render(<ImageModal {...defaultProps} />);

    const imageContainer = screen.getByAltText("Test Image")
      .parentElement as HTMLElement;
    fireEvent.click(imageContainer);

    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("deve definir overflow hidden no body quando aberto", () => {
    const { rerender } = render(
      <ImageModal {...defaultProps} isOpen={false} />
    );

    rerender(<ImageModal {...defaultProps} isOpen={true} />);

    expect(document.body.style.overflow).toBe("hidden");
  });

  it("deve restaurar overflow do body quando fechado", () => {
    const { unmount } = render(<ImageModal {...defaultProps} />);

    expect(document.body.style.overflow).toBe("hidden");

    unmount();

    expect(document.body.style.overflow).toBe("unset");
  });

  it("deve renderizar a imagem com src e alt corretos", () => {
    render(<ImageModal {...defaultProps} />);

    const image = screen.getByAltText("Test Image") as HTMLImageElement;
    expect(image).toHaveAttribute("src", "/images/test.jpg");
    expect(image).toHaveAttribute("alt", "Test Image");
  });
});
