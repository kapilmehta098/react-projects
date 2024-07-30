import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("Bank Account App", () => {
  test("opens account with initial balance of 500", () => {
    render(<App />);
    const openAccountButton = screen.getByText("Open Account");

    fireEvent.click(openAccountButton);

    expect(screen.getByText("Balance: 500")).toBeInTheDocument();
    expect(screen.getByText("Loan: 0")).toBeInTheDocument();
    expect(openAccountButton).toBeDisabled();
  });

  test("deposits 150 to the account", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Open Account"));
    const depositButton = screen.getByText("Deposit 150");

    fireEvent.click(depositButton);

    expect(screen.getByText("Balance: 650")).toBeInTheDocument();
  });

  test("withdraws 500 from the account", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Open Account"));
    fireEvent.click(screen.getByText("Deposit 150"));
    const withdrawButton = screen.getByText("withdraw 500");

    fireEvent.click(withdrawButton);

    expect(screen.getByText("Balance: 150")).toBeInTheDocument();
  });

  test("requests a loan of 5000", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Open Account"));
    const requestLoanButton = screen.getByText("Request a loan of 5000");

    fireEvent.click(requestLoanButton);

    expect(screen.getByText("Balance: 5500")).toBeInTheDocument();
    expect(screen.getByText("Loan: 5000")).toBeInTheDocument();
  });

  test("pays off the loan", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Open Account"));
    fireEvent.click(screen.getByText("Request a loan of 5000"));
    const payLoanButton = screen.getByText("Pay Loan");

    fireEvent.click(payLoanButton);

    expect(screen.getByText("Balance: 500")).toBeInTheDocument();
    expect(screen.getByText("Loan: 0")).toBeInTheDocument();
  });

  test("closes the account with zero balance and no loan", () => {
    render(<App />);

    // Open the account
    fireEvent.click(screen.getByText("Open Account")); // Balance should be 500

    // Withdraw the entire balance (500) to bring it to zero
    fireEvent.click(screen.getByText("withdraw 500")); // Balance now 450

    // Close the account
    const closeAccountButton = screen.getByText("Close account");
    fireEvent.click(closeAccountButton);

    // Expect the account to be closed with balance and loan reset
    expect(screen.getByText("Balance: 0")).toBeInTheDocument();
    expect(screen.getByText("Loan: 0")).toBeInTheDocument();
    // Check if "Open Account" button is enabled
    expect(
      screen.getByRole("button", { name: /Open Account/i })
    ).not.toBeDisabled();
  });
});
