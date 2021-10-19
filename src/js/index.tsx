import React from 'react';
import ReactDOM from 'react-dom';

import "src/style/index.scss";

// Главный файл
import Index from 'src/pages';

// Use scroll helper
const root = document.getElementById('root');

ReactDOM.render(
  <Index />,
  root
);
