import React, { useState, useEffect, useContext  } from 'react';
import axios from 'axios';
import { setUserSession, getToken  } from './Utils/Common';
import { useNavigate  } from "react-router-dom";
import { LoginContext } from '../App';
import { Form, Button } from 'react-bootstrap';
function LoginForm(props) {
  const [currentLogin, dispatch] = useContext(LoginContext);
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [error, setError] = useState(null);
  
    const Navigate = useNavigate ();
  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    
    axios.post('https://reqres.in/api/login', { email: username.value, password: password.value }).then(response => {
      setLoading(false);
      
      setUserSession( response.data.token, username.value);
      setIsLoggedin(true);
      dispatch('LOGIN');
      console.log(response.data.token);
    // Navigate('/');
    }).catch(error => {
      setLoading(false);
      
      if (error.response.status === 400) setError(error.response.data.error);
      else setError("Something went wrong. Please try again later.");
    });
  }
  useEffect(() => {
    // Update the document title using the browser API
    if(getToken()){
      setIsLoggedin(true);
      dispatch('LOGIN');
      
    }else{
      setIsLoggedin(false);
      dispatch('LOGOUT');
    }
  },[currentLogin, getToken()]);
 
  return !isLoggedin ? (
  
  (
    
    <div className="loginFormWrapper">
      <div className="FormContainer">
        <h2 className="formTitle">Welcome Back</h2>
          <p  className="formSubTitle">Sub-title text goes here</p>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              
              <Form.Control {...username} type="email" placeholder="Enter email" />
              
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              
              <Form.Control {...password} type="password" placeholder="Password" />
            </Form.Group>
            
            <Button className="formSubmitButton" variant="primary" onClick={handleLogin} disabled={loading} type="submit">
              {loading ? 'Loading...' : 'Login'}
            </Button>
            <Form.Group className="mb-3 overflowhidden" controlId="formBasicCheckbox">
              <Form.Check className="rpc"  type="checkbox" label="Remember Password" />
              <span className="forgotPassword">Forgot Password?</span>
            </Form.Group>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}
          </Form>
      </div>
    </div>
  ) ) : (
  
    <div>Login Success</div>
    );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default LoginForm;