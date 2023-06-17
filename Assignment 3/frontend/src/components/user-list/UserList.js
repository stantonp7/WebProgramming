import React from 'react';
import './UserList.css';
const UserList = props => {
    var users = props.users;
return <div className='Section'>
    <h2>User List</h2>
    <ul className="goal-list">
        {users.map(x => <li key={x.username}> {x.username} - {x.password} | {x.firstName} - {x.lastName} - {x.email} </li>)}
    </ul>
  </div>
}


export default UserList;
