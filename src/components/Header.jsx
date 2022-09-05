import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const currMonth = useSelector((state) => state.calendar.currMonth);

  return (
    <div>
      <h1>{currMonth}</h1>
      <Link to="/calendario">Home</Link>
      <Link to="/">Sair</Link>
    </div>
  );
}

// TODO CRIAR LÓGICA DE REDUX PARA MOSTRAR MÊS NO HEADER
