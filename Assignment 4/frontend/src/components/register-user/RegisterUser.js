import React from 'react';
import './RegisterUser.css';
import { useState } from 'react';
import SuccessModal from '../success-modal/SuccessModal';
import { CSSTransition } from 'react-transition-group';
const RegisterUser = props => {
    var users = props.users;
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };

    const onSubmit = () => {
        var success = validateNewUser();
        if (success) {
            const newUser = {
                username: username,
                password: password,
                firstName: firstName,
                lastName: lastName,
                email: email
              };
            
            props.handleNewUser(newUser);
            handleOpenModal();
        }
    }

    const validateNewUser = () => {
        var exists = users.some((element) => element.username === username);        
        if (exists) {
            setMessage("User Already Exists");
        } else {
            setMessage("Success!");
        }
        return !exists;
    }

  return <React.Fragment>
    <div className='Section'>
    <h2>New User Registration</h2>
    <div className="FormField">
        <label >Username: </label> 
        <input
        type="text"
        id="username-register"
        name="username"
        onChange={(event) => {setUsername(event.target.value)}}
        value={username}
      />
    </div>
    <div className="FormField">
        <label >Password: </label> 
        <input
        type="text"
        id="password-register"
        name="password"
        onChange={(event) => {setPassword(event.target.value)}}
        value={password}
      />
    </div>
    <div className="FormField">
        <label >First Name: </label> 
        <input
        type="text"
        id="first-name-register"
        name="first-name"
        onChange={(event) => {setFirstName(event.target.value)}}
        value={firstName}
      />
    </div>
    <div className="FormField">
        <label >Last Name: </label> 
        <input
        type="text"
        id="last-name-register"
        name="last-name"
        onChange={(event) => {setLastName(event.target.value)}}
        value={lastName}
      />
    </div>
    <div className="FormField">
        <label >Email: </label> 
        <input
        type="text"
        id="email-register"
        name="email"
        onChange={(event) => {setEmail(event.target.value)}}
        value={email}
      />
    </div>
    <button onClick={onSubmit} className = "Submit">Submit</button>
    <CSSTransition in={showModal} timeout={300} classNames="fade" unmountOnExit>
        <SuccessModal onConfirm={handleCloseModal} />
      </CSSTransition>
  </div>
  </React.Fragment>
}


export default RegisterUser;
