import React, {
  createContext, useState, useEffect, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../services/firebase';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: '',
    email: '',
  });
  const [userToken, setUserToken] = useState('');
  const [UID, setUID] = useState(false);
  const [userEdit, setUserEdit] = useState({});
  const [toUpdateProfile, setUpdateProfile] = useState(false);

  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, ({ uid }) => {
      setUID(uid);
    });
  }, []);

  const context = useMemo(() => ({
    user,
    setUser,
    UID,
    userEdit,
    setUserEdit,
    toUpdateProfile,
    setUpdateProfile,
    userToken,
    setUserToken,
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
