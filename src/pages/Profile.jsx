import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import useLogin from '../hooks/useLogin';

export default function Profile() {
  const [isLoaging, setLoading] = useState(true);
  const isLogged = useLogin();

  useEffect(() => isLogged && setLoading(false), [isLogged]);

  return (
    <div>
      {isLoaging ? <Loading /> : (
        <p>PROFILE</p>
      )}
    </div>
  );
}
