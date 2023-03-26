


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Controller from "./screens/Controller";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Controller/>
  </React.StrictMode>
);



// const container = document.getElementById('root');
// const root = createRoot(container);
// root.render(<Controller />);


// ReactDOM.render(<Controller />, document.getElementById("root"));
// createRoot.render(<Controller />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
