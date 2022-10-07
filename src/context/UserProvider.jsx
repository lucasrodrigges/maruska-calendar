import React, {
  createContext, useState, useEffect, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../services/firebase';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [isAdmin, setAdmin] = useState(false);

  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, ({ uid }) => {
      if (process.env.REACT_APP_ADMIN_UIDS.includes(uid)) setAdmin(true);
    });
  }, []);

  const context = useMemo(() => ({
    isAdmin,
    setAdmin,
  }));

  return (
    <UserContext.Provider value={context}>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
