import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import UserRegister from '../pages/UserRegister';
import renderWithRouter from './helpers/renderWithRouter';
import { testEmail, testPass } from './helpers/utilData';

describe('Testa elementos na página de cadastro de novo usuário', () => {
  beforeEach(() => renderWithRouter(<UserRegister />));

  test('Testa elementos existentes na página e se é possível digitar nos inputs', () => {
    const emailInput = screen.getByPlaceholderText('Seu email');
    const passInput = screen.getByPlaceholderText('Crie uma senha');
    const confPassInput = screen.getByPlaceholderText('Confirme sua senha');
    const createAccountBtn = screen.getByRole('button', { name: 'Criar' });
    const goBackBtn = screen.getByRole('button', { name: 'Voltar' });

    userEvent.type(emailInput, testEmail);
    userEvent.type(passInput, testPass);
    userEvent.type(confPassInput, testPass);

    expect(emailInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
    expect(confPassInput).toBeInTheDocument();
    expect(createAccountBtn).toBeInTheDocument();
    expect(goBackBtn).toBeInTheDocument();
    expect(emailInput.value).toBe(testEmail);
    expect(passInput.value).toBe(testPass);
    expect(passInput.value).toBe(testPass);
  });

  test('Testa comportamente com senhas diferentes', () => {
    const emailInput = screen.getByPlaceholderText('Seu email');
    const passInput = screen.getByPlaceholderText('Crie uma senha');
    const confPassInput = screen.getByPlaceholderText('Confirme sua senha');
    const createAccountBtn = screen.getByRole('button', { name: 'Criar' });

    userEvent.type(emailInput, testEmail);
    userEvent.type(passInput, testPass);
    userEvent.type(confPassInput, '123');
    userEvent.click(createAccountBtn);

    const errorMessage = screen.getByText('As senhas estão diferentes, favor verifique.');

    expect(errorMessage).toBeInTheDocument();
  });

  // test('Testa se é possível criar uma conta', () => {
  //   const emailInput = screen.getByPlaceholderText('Seu email');
  //   const passInput = screen.getByPlaceholderText('Crie uma senha');
  //   const confPassInput = screen.getByPlaceholderText('Confirme sua senha');
  //   const createAccountBtn = screen.getByRole('button', { name: 'Criar' });

  //   userEvent.type(emailInput, testEmail);
  //   userEvent.type(passInput, testPass);
  //   userEvent.type(confPassInput, testPass);
  //   userEvent.click(createAccountBtn);

  //   expect(window.location.href.includes('calendario')).toBeTruthy();
  // });

  test('Testa botão de voltar para Login', () => {
    const goBackBtn = screen.getByRole('button', { name: 'Voltar' });

    userEvent.click(goBackBtn);

    expect(window.location.href).toBe('http://localhost/');
  });
});
