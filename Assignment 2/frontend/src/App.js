import logo from './logo.svg';
import './App.css';
import LoginUser from './components/login-user/LoginUser';
import RegisterUser from './components/register-user/RegisterUser';
import UserList from './components/user-list/UserList';
import { useEffect, useState } from 'react';
function App() {
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    setRegisteredUsers([{
      username: 'Admin',
      password: 'Admin',
      firstName: 'Admin',
      lastName: 'Admin',
      email: 'admin@rowan.edu'
    }]);
  }, []);

  const handleNewUser = (user) => {
      setRegisteredUsers([...registeredUsers, user]);
  }
  return (
    <div className="App">
      <h1>Assignment 2 - Paul Stanton</h1>
      <LoginUser users={registeredUsers}></LoginUser>
      <RegisterUser users={registeredUsers} handleNewUser={handleNewUser}></RegisterUser>
      <UserList users={registeredUsers}></UserList>
    </div>
  );
}

export default App;
