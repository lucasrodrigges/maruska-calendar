import React, { useEffect, useState } from 'react';
import EventForm from './EventForm';

export default function CalendarCards() {
  const months = [
    { name: 'Jan', month: 'Janeiro' },
    { name: 'Feb', month: 'Fevereiro' },
    { name: 'Mar', month: 'Março' },
    { name: 'Apr', month: 'Abril' },
    { name: 'May', month: 'Maio' },
    { name: 'June', month: 'Junho' },
    { name: 'July', month: 'Julho' },
    { name: 'Aug', month: 'Agosto' },
    { name: 'Sept', month: 'Setembro' },
    { name: 'Oct', month: 'Outubro' },
    { name: 'Nov', month: 'Novembro' },
    { name: 'Dec', month: 'Dezembro' },
  ];
  // const weekDays = [
  //   { name: 'Sun', day: 'Domingo' },
  //   { name: 'Mon', day: 'Segunda' },
  //   { name: 'Tue', day: 'Terça' },
  //   { name: 'Wed', day: 'Quarta' },
  //   { name: 'Thu', day: 'Quinta' },
  //   { name: 'Fri', day: 'Sexta' },
  //   { name: 'Sat', day: 'Sábado' },
  // ];

  // const [weekOfDay, setWeekOfDay] = useState('');
  const [currMonth, setCurrMonth] = useState('');
  // const [currDay, setCurrDay] = useState('');

  useEffect(() => {
    const date = new Date();

    setCurrMonth(months[date.getMonth()].month);
    // setCurrDay(weekDays[date.getDay()].day);
  }, []);

  useEffect(() => {
    // const findMonth = months.find(({ month }) => month === currMonth);
  }, [currMonth]);

  return (
    <div className="calendar-card">
      <EventForm />
    </div>
  );
}
