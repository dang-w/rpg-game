import { render, screen } from '@testing-library/react';
import CurrentTurn from './CurrentTurn';

describe('CurrentTurn', () => {
  test('renders CurrentTurn component on screen', () => {
    render(<CurrentTurn name={'test'} />);
    const currentTurnElement = screen.getByText(/test is currently attacking!/);
    expect(currentTurnElement).toBeInTheDocument();
  });
});
