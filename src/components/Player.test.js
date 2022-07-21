import { render, screen } from '@testing-library/react';
import Player from './Player';

describe('Player', () => {
  test('renders Player component on screen', () => {
    render(<Player player={{
      name: 'test',
      health: 13,
    }} />);
    const playerElement = screen.getByText(/I am test and my health is currently 13/);
    expect(playerElement).toBeInTheDocument();
  });
});
