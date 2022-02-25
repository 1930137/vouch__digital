import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';
import { useNavigate  } from "react-router-dom";

function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
    const Navigate = useNavigate ();
  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    console.log(username.value);
    axios.post('https://reqres.in/api/login', { email: username.value, password: password.value }).then(response => {
      setLoading(false);
      
      setUserSession( response.data.token, username.value);
      Navigate('/about');
    }).catch(error => {
      setLoading(false);
      console.log(error);
      if (error.response.status === 400) setError(error.response.data.error);
      else setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <div>
      Login<br /><br />
      <div>
        Username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </div>
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

export default Login;