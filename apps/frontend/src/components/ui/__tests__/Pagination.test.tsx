import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from "../Pagination";

describe("Pagination", () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 10,
    onPageChange: vi.fn(),
  };

  it("should render pagination controls", () => {
    render(<Pagination {...defaultProps} />);

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to next page")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to last page")).toBeInTheDocument();
  });

  it("should call onPageChange when clicking next", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(<Pagination {...defaultProps} onPageChange={onPageChange} />);

    await user.click(screen.getByLabelText("Go to next page"));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("should call onPageChange when clicking previous", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination
        {...defaultProps}
        currentPage={5}
        onPageChange={onPageChange}
      />,
    );

    await user.click(screen.getByLabelText("Go to previous page"));

    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it("should show current page", () => {
    render(<Pagination {...defaultProps} currentPage={3} />);

    expect(screen.getByLabelText("Go to page 3")).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});
