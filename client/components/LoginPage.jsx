import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const LoginPage = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameInput = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const [status, setStatus] = useState(' ');
  const history = useHistory();

  const login = (username, password) => {
    axios.post('/user', {
      username,
      password
    })
      .then((userinfo) => {
        if (userinfo.err) {
          console.log('error in login');
          setStatus(
            'Unable to recognize account. Please check your credentials and try again.'
          );
          return;
        }

        history.push('/dashboard');
      })
      .catch((error) => {
        setStatus(
          'An error occured on the server. Please check your credentials and try again.'
        );
        console.log(error);
      })
  };

  return (
    <div>
      <div>
        <Link to="/dashboard">
          Dashboard
        </Link>
      </div>
    </div>>

  );

}

export default LoginPage;
