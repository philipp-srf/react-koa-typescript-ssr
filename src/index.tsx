import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { AppContext } from './AppContext';
import './index.css';

const root = document.querySelector('#root');

declare global {
  interface Window {
    __INITIAL__DATA__?: any;
  }
}

// Read the initial data from the window only the first time and return undefined for every subsequent call.
export const getInitialData = () => {
  const initalData = window.__INITIAL__DATA__;
  window.__INITIAL__DATA__ = undefined;
  return initalData;
};

const ClientApp = () => (
  <BrowserRouter>
    <AppContext.Provider value={{ getInitialData }}>
      <App />
    </AppContext.Provider>
  </BrowserRouter>
);

if (root && root.hasChildNodes() === true) {
  ReactDOM.hydrate(<ClientApp />, root);
} else {
  ReactDOM.render(<ClientApp />, root);
}
