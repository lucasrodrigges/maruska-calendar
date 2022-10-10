import React from 'react';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import { testEmail, testPass } from './helpers/utilData';

describe('Testa elementos da página de login', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Testa existência dos inputs e se é possível digitar neles', () => {
    const emailInput = screen.getByPlaceholderText('Email');
    const passInput = screen.getByPlaceholderText('Senha');
    const loginBtn = screen.getByRole('button', { name: 'Login' });

    userEvent.type(emailInput, testEmail);
    userEvent.type(passInput, testPass);

    expect(emailInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
    expect(emailInput.value).toBe(testEmail);
    expect(passInput.value).toBe(testPass);
  });

  // test('Testa se é possível fazer login', async () => {
  //   const emailInput = screen.getByTestId('email-input');
  //   const passInput = screen.getByTestId('pass-input');
  //   const loginBtn = screen.getByRole('button', { name: 'Login' });

  //   userEvent.type(emailInput, testEmail);
  //   userEvent.type(passInput, testPass);
  //   userEvent.click(loginBtn);

  //   await waitFor(() => {
  //     expect(window.location.href.includes('calendario')).toBeTruthy();
  //   });
  // });

  test('Testa link para `UserRegister page`', async () => {
    const linkToRegister = screen.getByRole('link');

    userEvent.click(linkToRegister);

    expect(linkToRegister.innerHTML).toBe('Criar uma conta');
    expect(window.location.href.includes('novo-usuario')).toBeTruthy();
  });
});
