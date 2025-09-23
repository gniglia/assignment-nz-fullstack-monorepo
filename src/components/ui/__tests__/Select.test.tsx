import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Select } from "../Select";

describe("Select", () => {
  it("should render select with options", () => {
    const options = [
      { value: "", label: "Choose an option" },
      { value: "1", label: "Option 1" },
      { value: "2", label: "Option 2" },
    ];

    render(<Select options={options} />);

    // Check visual outcome: select is rendered
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();

    // Check visual outcome: options are shown
    expect(screen.getByText("Choose an option")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  it("should show disabled state", () => {
    const options = [{ value: "1", label: "Option 1" }];

    render(<Select options={options} disabled />);

    // Check visual outcome: select is disabled
    const select = screen.getByRole("combobox");
    expect(select).toBeDisabled();
  });
});
