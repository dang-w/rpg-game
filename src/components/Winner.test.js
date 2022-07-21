import { render, screen } from '@testing-library/react';
import Winner from './Winner';

describe('Winner', () => {
  test('renders Winner component on screen', () => {
    render(<Winner winner={'test'} />);
    const winnerElement = screen.getByText(/test is the winner!/);
    expect(winnerElement).toBeInTheDocument();
  });
});
