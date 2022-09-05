import React, { useEffect, useState } from 'react';

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
  const weekDays = [
    { name: 'Sun', day: 'Domingo' },
    { name: 'Mon', day: 'Segunda' },
    { name: 'Tue', day: 'Terça' },
    { name: 'Wed', day: 'Quarta' },
    { name: 'Thu', day: 'Quinta' },
    { name: 'Fri', day: 'Sexta' },
    { name: 'Sat', day: 'Sábado' },
  ];

  // const [weekOfDay, setWeekOfDay] = useState('');
  const [currMonth, setCurrMonth] = useState('');
  const [currDay, setCurrDay] = useState('');
  const [numOfDays, setNumOfDays] = useState();
  const [days, setDays] = useState([]);
  const [dayIndex, setDayIndex] = useState(0);

  useEffect(() => {
    const date = new Date();

    setCurrMonth(months[date.getMonth()].month);
    setCurrDay(weekDays[date.getDay()].day);
  }, []);

  useEffect(() => {
    const findMonth = months.find(({ month }) => month === currMonth);
    if (findMonth) {
      const newDate = new Date(`${findMonth.name} 01 2022`);
      const daysOfMonth = new Date(2022, months.indexOf(findMonth) + 1, 0).getDate();
      const index = newDate.getDay();

      setCurrDay(weekDays[index].day);
      setNumOfDays(daysOfMonth);
      setDayIndex(index);
      setDays([]);
    }
  }, [currMonth]);

  useEffect(() => {
    const newArr = [];

    for (let i = 1; i <= numOfDays; i += 1) {
      newArr.push(i);
    } setDays(newArr);
  }, [numOfDays]);

  return (
    <div className="calendar-card">
      <p>{numOfDays}</p>
      <label htmlFor="months">
        <select
          name="months"
          id="months"
          value={currMonth}
          onChange={({ target }) => setCurrMonth(target.value)}
        >
          {months.map(({ month }) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
        <h1>{currMonth}</h1>
      </label>
      <table>
        <thead>
          <tr>
            {weekDays.map(({ day }) => (
              <th className={day === currDay ? 'curr-day' : 'day-colum'} key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr key={day}>
              <td>a</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
