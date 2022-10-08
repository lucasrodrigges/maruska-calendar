import React from 'react';
// import App from '../App';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { testEmail, testPass } from './helpers/utilData';

let currHistory;

describe('Testa elementos da página de login', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    currHistory = history;
  });

  test('Testa existência dos inputs e se possível digitar neles', () => {
    expect(currHistory.location.pathname).toBe('/');

    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('pass-input');

    userEvent.type(emailInput, testEmail);
    userEvent.type(passInput, testPass);

    expect(emailInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
  });
});
