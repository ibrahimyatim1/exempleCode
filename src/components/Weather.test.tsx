import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Weather from "./Weather";

global.navigator.geolocation = {
  getCurrentPosition: jest.fn((success) =>
    success({
      coords: {
        latitude: 51.1,
        longitude: 45.3,
      },
    })
  ),
} as any;

describe("testing weather component", () => {
  beforeEach(() => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        list: [
          { dt_txt: "2024-02-26 12:00:00", main: { temp: 20 } },
          { dt_txt: "2024-02-27 12:00:00", main: { temp: 22 } },
        ],
      }),
    } as any);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders loading state", () => {
    render(<Weather />);
    expect(screen.getByText("Loading weather data...")).toBeInTheDocument();
  });

  test("renders weather data after the fetch function", async () => {
    render(<Weather />);

    await waitFor(() => {
      expect(screen.getByText("Day 1")).toBeInTheDocument();
      expect(screen.getByText("Temperature: 200")).toBeInTheDocument();
    });
  });
});
