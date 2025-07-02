import React from 'react';
import './Navbar.scss' ; 
import Logo from '../Logo/Logo';

const Navbar = () => {
    return (
        <div className='navbar-container'>
            <div className="nav-left">
                <Logo />
            </div>
            <div className="nav-right">
                <div className="currentUser">
                    <img></img>
                </div>
            </div>
        </div>
    );
};

export default Navbar;