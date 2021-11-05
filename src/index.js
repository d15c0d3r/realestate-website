import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {TokenContextProvider} from "./Context/tokenContext"

ReactDOM.render(
  <TokenContextProvider>
    <App />
  </TokenContextProvider>,
  document.getElementById('root')
);
