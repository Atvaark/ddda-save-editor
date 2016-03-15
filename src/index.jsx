import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app.jsx';

require('style.css');
require('bootstrap/dist/css/bootstrap.css');

window.onload = function init() {
  const container = document.createElement('div');
  container.id = 'app';
  document.body.appendChild(container);

  ReactDOM.render(
    <App />,
    container
  );
};
