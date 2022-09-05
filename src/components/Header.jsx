import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div>
      <h1>MÊS AQUI</h1>
      <Link to="/">Sair</Link>
    </div>
  );
}

// TODO CRIAR LÓGICA DE REDUX PARA MOSTRAR MÊS NO HEADER
