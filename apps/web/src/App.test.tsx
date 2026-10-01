import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  it('renders the initial welcome screen', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: 'Seu espaço de operações começa aqui.' }),
    ).toBeInTheDocument();
  });
});
