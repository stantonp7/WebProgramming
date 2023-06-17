import React from "react";
import { NavLink } from "react-router-dom";

import './navbar.css';
const Navbar = () => {

    return (
        <nav>
        <ul className='navbar'>
        <li className='nav-item'><NavLink to="/" exact>All Users</NavLink></li>
        <li className='nav-item'><NavLink to="/newuser" exact>Add User</NavLink></li>
        <li className='nav-item'><NavLink to="/login">Login</NavLink></li>
        
    </ul>
    </nav>
    )
};

export default Navbar;