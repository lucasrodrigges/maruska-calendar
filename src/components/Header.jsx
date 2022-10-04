import React, { useContext } from 'react';
import { CalendarContext } from '../context/CalendarProvider';
import '../style/Header.css';

export default function Header() {
  const { currMonth } = useContext(CalendarContext);

  return (
    <div className="header">
      <h1>Maruska Calendar</h1>
      <h2>{currMonth}</h2>

    </div>
  );
}
