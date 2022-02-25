import logo from './logo.svg';
import React, {createContext, useReducer} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navigation from './Components/Navigation';
import {  reducer } from './Components/Utils/Common';
import Footer from './Components/Footer';
import Home from './Components/Home';
import About from './Components/About';
// Create a Context
export  const LoginContext = createContext();
function App() {
  
  const[currentLogin, dispatch] = useReducer(reducer, false);
  return (
    <LoginContext.Provider value={[currentLogin, dispatch]}>
    <Router>
    <div>
      <Navigation/>
      
      
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      </Routes>
      
     
      <Footer/>
      
    </div>
    </Router>
   </ LoginContext.Provider>
  );
}

export default App;
