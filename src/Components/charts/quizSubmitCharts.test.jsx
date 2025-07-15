import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import QuizSubmissionsChart from "./quizSubmitCharts";
import api from "../api";

jest.mock("../api");

describe("QuizSubmissionsChart", () => {
  beforeEach(() => {
    localStorage.setItem("token", "test-token");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    render(<QuizSubmissionsChart />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders error state", async () => {
    api.get.mockRejectedValueOnce(new Error("API error"));
    render(<QuizSubmissionsChart />);
    expect(
      await screen.findByText((content) =>
        content.toLowerCase().includes("failed to load submissions")
      )
    ).toBeInTheDocument();
  });

  it("renders submissions data", async () => {
    api.get.mockResolvedValueOnce({
      data: [
        {
          username: "user1",
          score: 7,
          selectedAnswers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          timeTaken: 12,
        },
        {
          username: "user2",
          score: 5,
          selectedAnswers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          timeTaken: 15,
        },
      ],
    });
    render(<QuizSubmissionsChart />);
    expect(
      await screen.findByText((content) =>
        content.toLowerCase().includes("total participants")
      )
    ).toBeInTheDocument();
    expect(await screen.findByText(/user1/i)).toBeInTheDocument();
    expect(await screen.findByText(/user2/i)).toBeInTheDocument();
  });
});
