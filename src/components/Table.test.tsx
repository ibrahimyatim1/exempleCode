import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Table from "./Table";

const mockData = [
  { id: "1", model: "Row1", tilt: 30, capacity: 100, isActive: true },
];

const mockUpdate = jest.fn();

describe("Table Component", () => {
  test("renders table with data", () => {
    render(<Table dataProp={mockData} onUpdate={mockUpdate} />);

    expect(screen.getByText("Row1")).toBeInTheDocument();
    expect(screen.getByText("Table")).toBeInTheDocument();
  });

  test("edits a row", () => {
    render(<Table dataProp={mockData} onUpdate={mockUpdate} />);

    const editButton = screen.getByText("Edit");
    fireEvent.click(editButton);

    const input = screen.getByDisplayValue("Row1");
    fireEvent.change(input, { target: { value: "New Model" } });

    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    expect(mockUpdate).toHaveBeenCalled();
  });

  test("deletes a row", () => {
    render(<Table dataProp={mockData} onUpdate={mockUpdate} />);

    const deleteButton = screen.getByText("Delete");
    fireEvent.click(deleteButton);

    expect(mockUpdate).toHaveBeenCalledWith([]);
  });
});
