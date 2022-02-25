import React, {useState, useEffect, useContext} from 'react';
import ReactDOM from 'react-dom';
import HeaderWrapper from './Hoc/HeaderWrapper';
import{Navbar, Container, Nav, Button} from 'react-bootstrap';
import { removeUserSession, getToken, reducer } from './Utils/Common';
import { Link } from "react-router-dom";
import { LoginContext } from '../App';
const Navigation = () => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [currentLogin, dispatch] = useContext(LoginContext);
  useEffect(() => {
    // Update the document title using the browser API
    if(getToken()){
      setIsLoggedin(true);
      dispatch('LOGIN');
    }else{
      setIsLoggedin(false);
      dispatch('LOGOUT');
    }
  });
  const handleLoginLogout = () => {
    if(isLoggedin){
      removeUserSession();
      setIsLoggedin(false);
      dispatch('LOGOUT');
    }else{
      console.log("Login focused");
    }
  }


    return ( 
       
        
       
        <Navbar bg="light" expand="lg">
          
  <Container>
    <Navbar.Brand href="#home">
      <img className="logo_image" src='./logo_new.png'  alt=""/>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="navbar-nav ms-auto">
        
        
      </Nav>
      <Button className="freeTrialButton"  variant="outline-success">Start Free Trial</Button>
      <Button className="loginButton"  onClick={handleLoginLogout} variant="outline-success">{!isLoggedin ? 'Login' : 'Logout'}</Button>
     
    </Navbar.Collapse>
  </Container>
</Navbar>

     
          )
}
 
export default HeaderWrapper(Navigation);