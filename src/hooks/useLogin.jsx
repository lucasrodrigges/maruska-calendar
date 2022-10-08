import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../services/firebase';
import { getFromLS } from '../services/localStorage';

export default function useLogin() {
  const navigate = useNavigate();

  const auth = getAuth(app);

  const currAccessToken = getFromLS('session')?.accessToken || '';

  return onAuthStateChanged(auth, ({ accessToken }) => {
    if (currAccessToken && currAccessToken === accessToken) return true;
    return navigate('/');
  });
}
