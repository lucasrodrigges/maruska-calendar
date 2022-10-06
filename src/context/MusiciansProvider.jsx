import React, {
  useEffect, useState, createContext, useMemo,
} from 'react';
import { collection, getDocs } from 'firebase/firestore';
import PropTypes from 'prop-types';

import { db } from '../services/firebase';

export const MusiciansContext = createContext();

export function MusiciansProvider({ children }) {
  const [musicians, setMusicians] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const musiciansArr = [];
    getDocs(collection(db, 'musicians'))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { id } = doc;
          const musician = doc.data();
          musiciansArr.push({ ...musician, id });
        });
        setMusicians([...musicians, ...musiciansArr]);
        setLoading(false);
      });
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
