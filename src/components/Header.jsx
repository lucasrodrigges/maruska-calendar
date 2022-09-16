import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const currMonth = useSelector((state) => state.calendar.currMonth);

  return (
    <div>
      <h1>Maruska Calendar</h1>
      <h2>{currMonth}</h2>
      <Link to="/calendario">Home</Link>
      <Link to="/">Sair</Link>
    </div>
  );
}
