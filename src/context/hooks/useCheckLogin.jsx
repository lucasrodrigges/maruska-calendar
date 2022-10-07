import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from '../../services/firebase';
import { getFromLS } from '../../services/localStorage';

export default function useCheckLogin() {
  const auth = getAuth(app);
  const navigate = useNavigate();

  onAuthStateChanged(auth, ({ accessToken }) => {
    const currAccessToken = getFromLS('session')?.accessToken || '';

    if (accessToken !== currAccessToken) return navigate('/');
    return true;
  });
}
