
import './App.css';
import Nav from './components/navigation/Nav';
import { Route, Routes } from "react-router-dom";
import Login from './components/login/Login';
import Register from './components/register/Register';
import Users from './components/managerUsers/Users';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import _ from "lodash";
import { useState, useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';


function App() {

  const [account, setAccount] = useState({});

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      setAccount(JSON.parse(session))
    }
  }, [])


  return (
    <div className="App">
      <div className='app-header'>
        <Nav />
      </div>
      <AppRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
