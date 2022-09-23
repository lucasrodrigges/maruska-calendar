import React, {
  useMemo, useState, createContext,
} from 'react';
import PropTypes from 'prop-types';

export const CalendarContext = createContext();

export function CalendarProvider({ children }) {
  const [currMonth, setCurrMonth] = useState(null);

  const context = useMemo(() => ({
    currMonth,
    setCurrMonth,
  }));

  return (
    <CalendarContext.Provider value={context}>
      {children}
    </CalendarContext.Provider>
  );
}

CalendarProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
