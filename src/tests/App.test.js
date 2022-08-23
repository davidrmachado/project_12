import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

describe('Testes da aplicação', () => {
  it('Verifica se, ao digitar na campo de busca, o planeta certo é exibido', async () => {
    render(<App />);

    const linhas = screen.getAllByRole('row');
    expect(linhas.length).toBe(10);
    
    const nameInput = screen.getByTestId('name-filter');
    userEvent.type(nameInput, 'Coruscant')
    
    const capital = await screen.findByText('Coruscant');
    expect(capital).toBeInTheDocument();

    expect(linhas.length).toBe(1); 

  });

  it('Verifica o resultado após aplicar múltiplos filtros', async () => {
    render(<App />);

    const hoth = await screen.findByText('Hoth');
    expect(hoth).toBeInTheDocument()

    const columnFilter = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnFilter, 'diameter');

    const comparisonFilter = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonFilter, 'maior que');

    const valueFilter = screen.getByTestId('value-filter');
    userEvent.type(valueFilter, '8000');

    const button = screen.getByTestId('button-filter');
    userEvent.click(button);

    expect(hoth).not.toBeInTheDocument()
  });
});
