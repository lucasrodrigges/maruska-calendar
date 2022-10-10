import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { testEmail, testPass } from './helpers/utilData';
import Login from '../pages/Login';

describe('Testa elementos da página de login', () => {
  // beforeEach(() => {
  //   const { history } = renderWithRouter(<App />);
  //   currHistory = history;
  // });

  test('Testa existência dos inputs e se possível digitar neles', () => {
    const { history } = renderWithRouter(<App />);

    expect(history.location.pathname).toBe('/');

    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('pass-input');

    userEvent.type(emailInput, testEmail);
    userEvent.type(passInput, testPass);

    expect(emailInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
    expect(emailInput.value).toBe(testEmail);
    expect(passInput.value).toBe(testPass);
  });

  test('Testa link para `UserRegister page`', async () => {
    const { history } = renderWithRouter(<Login />);

    const linkToRegister = screen.getByRole('link');

    userEvent.click(linkToRegister);

    expect(linkToRegister.innerHTML).toBe('Criar uma conta');
    expect(history.location.pathname).toBe('/novo-usuario');
  });
});
