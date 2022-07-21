import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders player one component on screen', () => {
    render(<App />);
    const playerElement = screen.getByText(/I am player one/);
    expect(playerElement).toBeInTheDocument();
  });

  test('renders player two component on screen', () => {
    render(<App />);
    const playerElement = screen.getByText(/I am player two/);
    expect(playerElement).toBeInTheDocument();
  });

  test('renders attack button', () => {
    render(<App />);
    const buttonElement = screen.getByText(/ATTACK/);
    expect(buttonElement).toBeInTheDocument();
  });

  test("it should show it is player one's turn", () => {
    render(<App />);
    const currentTurnElement = screen.getByText(/player one is currently attacking!/);
    expect(currentTurnElement).toBeInTheDocument();
  });

  test('clicking attack button plays the round', () => {
    render(<App />);
    const buttonElement = screen.getByText(/ATTACK/);
    fireEvent.click(buttonElement);

    const currentTurnElement = screen.getByText(/player two is currently attacking!/);
    expect(currentTurnElement).toBeInTheDocument();
  });
});
