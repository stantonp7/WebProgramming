import React from 'react';
import './LoginUser.css';
import { useState } from 'react';
const LoginUser = props => {
    var users = props.users;
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = () => {
        validateLogin();
    }

    const validateLogin = () => {
        var exists = users.some((element) => element.username === username && element.password === password);        
        if (exists) {
            setMessage("Success!");
        } else {
            setMessage("Invalid Credentials");
        }
    }

  return <div className='Section'>
    <h2>Login</h2>
    <div className="FormField">
        <label >Username: </label> 
        <input
        type="text"
        id="username-login"
        name="username"
        onChange={(event) => {setUsername(event.target.value)}}
        value={username}
      />
    </div>
    <div>
        <label >Password: </label> 
        <input
        type="text"
        id="password-login"
        name="password"
        onChange={(event) => {setPassword(event.target.value)}}
        value={password}
      />
    </div>
    <button onClick={onSubmit} className = "Submit">Submit</button>
    <div>{message}</div>
  </div>
}

export default LoginUser;
