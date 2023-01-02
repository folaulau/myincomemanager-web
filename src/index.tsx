import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './index.css';
import { Provider } from 'react-redux';
import store from './store/store';
import AppRoutes from './routes';
import reportWebVitals from './reportWebVitals';

console.log("Backend Env: "+ process.env.REACT_APP_BACKEND_ENV)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      <AppRoutes/>
    {/* </React.StrictMode> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
