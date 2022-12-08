import React, {
  useEffect, useState, createContext, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import UseAxios from '../hooks/UseAxios';

export const MusiciansContext = createContext();

export function MusiciansProvider({ children }) {
  const [musicians, setMusicians] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const axios = UseAxios();

  useEffect(() => {
    axios.get('/musician').then(({ data }) => {
      setMusicians([...musicians, ...data]);
      setLoading(false);
    }).catch((err) => console.error('ERROR => ', err));
  }, []);

  const context = useMemo(() => ({
    musicians,
    setMusicians,
    isLoading,
    setLoading,
  }));

  return (
    <MusiciansContext.Provider value={context}>
      {children}
    </MusiciansContext.Provider>
  );
}

MusiciansProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
