import React from 'react';
import Main from './layouts/Main';
import './App.css';
import {LoginProvider} from "./context/LoginContext"

function App() {
  return (
    <>
      <LoginProvider>
        <Main />
      </LoginProvider>
    </>
  );
}

export default App;
