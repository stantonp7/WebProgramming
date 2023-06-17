import logo from './logo.svg';
import './App.css';
import {HashRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import LoginUser from './components/login-user/LoginUser';
import RegisterUser from './components/register-user/RegisterUser';
import UserList from './components/user-list/UserList';
import { useEffect, useState } from 'react';
import Navbar from './components/navbar/navbar';
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
      <Router>
      <Navbar></Navbar>
        <Switch>
          <Route path="/" exact>
              <UserList users={registeredUsers}></UserList>
          </Route>
          <Route path="/newuser">
              <RegisterUser users={registeredUsers} handleNewUser={handleNewUser}></RegisterUser>
          </Route>
          <Route path="/login">
              <LoginUser users={registeredUsers}></LoginUser>
          </Route>
          <Redirect to="/"/>
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
