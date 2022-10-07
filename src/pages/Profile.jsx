import React from 'react';
import useCheckLogin from '../context/hooks/useCheckLogin';

export default function Profile() {
  useCheckLogin();

  return (
    <div>Profile</div>
  );
}
