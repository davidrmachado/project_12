import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import AppProvider from '../context/AppProvider';

describe('Testes diversos da aplicação', () => {

  it('Verifica se os campos de filtro renderizaram corretamente', () => {
    render(<AppProvider> <App /> </AppProvider>);
  
    const nameFilter = screen.getByTestId("name-filter");
    expect(nameFilter).toBeInTheDocument();
  
    const columnFilter = screen.getByTestId("column-filter");
    expect(columnFilter).toBeInTheDocument();
  
    const comparisonFilter = screen.getByTestId("comparison-filter");
    expect(comparisonFilter).toBeInTheDocument();
  
    const valueFilter = screen.getByTestId("value-filter");
    expect(valueFilter).toBeInTheDocument();
  });

  it('Verifica se, ao digitar na campo de busca, o planeta certo é exibido', async () => {
    render(<AppProvider> <App /> </AppProvider>);

    const linhas = await screen.getAllByRole('row');
    expect(linhas.length).toBe(1);

    const nameInput = screen.getByTestId('name-filter');
    userEvent.type(nameInput, 'Coruscant')
    
    const capital = await screen.findByText('Coruscant');
    expect(capital).toBeInTheDocument();

    expect(linhas.length).toBe(1); 

  });

  it('Verifica o resultado após aplicar um filtro', async () => {
    render(<AppProvider> <App /> </AppProvider>);

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

  it('Verifica o resultado após aplicar múltiplos filtros', async () => {
    render(<AppProvider> <App /> </AppProvider>);

    const columnFilter = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnFilter, ['surface_water']);

    const comparisonFilter = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonFilter, ['igual a']);

    const valueFilter = screen.getByTestId('value-filter');
    userEvent.type(valueFilter, '8');

    const button = screen.getByTestId('button-filter');
    expect(button).toBeInTheDocument();

    userEvent.click(button);
    expect(await screen.findByRole('cell', {  name: /Dagobah/i })).toBeInTheDocument();

    userEvent.selectOptions(columnFilter, ['rotation_period']);
    userEvent.selectOptions(comparisonFilter, ['menor que']);
    userEvent.type(valueFilter, '23');
    userEvent.click(button);

    expect(await screen.findByRole('cell', {  name: /Endor/i })).toBeInTheDocument();
  });

  it('Verifica o resultado após aplicar outros filtros', async () => {
    render(<AppProvider> <App /> </AppProvider>);

    const columnFilter = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnFilter, ['orbital_period']);

    const comparisonFilter = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonFilter, ['menor que']);

    const valueFilter = screen.getByTestId('value-filter');
    userEvent.type(valueFilter, '400');

    const button = screen.getByTestId('button-filter');
    expect(button).toBeInTheDocument();

    userEvent.click(button);
    expect(await screen.findByRole('cell', {  name: /Dagobah/i })).toBeInTheDocument();

    userEvent.selectOptions(columnFilter, ['rotation_period']);
    userEvent.selectOptions(comparisonFilter, ['maior que']);
    userEvent.type(valueFilter, '23');
    userEvent.click(button);

    expect(await screen.findByRole('cell', {  name: /Alderaan/i })).toBeInTheDocument();
  });

});
