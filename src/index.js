import React from 'react';
import ReactDOM from 'react-dom';

// import App from './components/App';
// import Firebase, { FirebaseContext } from './components/Firebase';
import App from './app-router';

// ReactDOM.render(
//   <FirebaseContext.Provider value={new Firebase()}>
//     <App />
//   </FirebaseContext.Provider>,
//   document.getElementById('root')
// );

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
