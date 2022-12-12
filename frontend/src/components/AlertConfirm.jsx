import React from 'react';
import PropTypes from 'prop-types';

export default function AlertConfirm({ func, setShowAlert }) {
  return (
    <div className="alert-confirm">
      <div className="event-container">
        <h3>Deseja realmente excluir o evento?</h3>
        <button type="button" className="button-1" onClick={() => func()}>Sim</button>
        <button type="button" className="button-1" onClick={() => setShowAlert()}>Não</button>
      </div>
    </div>
  );
}

AlertConfirm.propTypes = {
  func: PropTypes.func.isRequired,
  setShowAlert: PropTypes.func.isRequired,
}.isRequired;
