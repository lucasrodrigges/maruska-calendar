import React, { Router } from 'react-router-dom';

export default function withRouter(component, history) {
  return (
    <Router history={history}>
      { component }
    </Router>
  );
}
