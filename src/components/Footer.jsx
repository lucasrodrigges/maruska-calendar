import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <Link to="/calendario">
        <i className="fa-solid fa-house icons" />
      </Link>
      <Link to="/">
        <i className="fa-solid fa-right-from-bracket icons" />
      </Link>
    </footer>
  );
}
