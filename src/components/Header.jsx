import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CalendarContext } from '../context/CalendarProvider';

export default function Header() {
  const { currMonth } = useContext(CalendarContext);

  return (
    <div>
      <h1>Maruska Calendar</h1>
      <h2>{currMonth}</h2>
      <Link to="/calendario">Home</Link>
      <Link to="/">Sair</Link>
    </div>
  );
}
