import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import App from "./App";

jest.mock("axios");
jest.mock("./components/Weather", () => () => <div>Weather Component</div>);
jest.mock("./components/Table", () => () => <div>Table Component</div>);

describe("App Component", () => {
  beforeEach(() => {
    jest.spyOn(axios, "get").mockResolvedValue({
      data: {
        data: [
          {
            id: "1",
            model: "Test Model",
            tilt: 20,
            capacity: 200,
            isActive: true,
          },
        ],
      },
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders the 2components correctly", async () => {
    render(<App />);

    expect(screen.getByText("Weather Component")).toBeInTheDocument();
    expect(screen.getByText("Table Component")).toBeInTheDocument();

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalled();
    });
  });
});
