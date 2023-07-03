import React from 'react';
import ReactDOM from 'react-dom/client';
// import 'react-perfect-scrollbar/dist/css/styles.css';
import './index.css';
import './i18n';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store/index';
import AppTheme from './AppTheme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppTheme>
        <App />
      </AppTheme>
    </Provider>
  </React.StrictMode>,
);
