// Navigation.js

import React from 'react';
import './Navigation.css';
import '../User/User';

function Navigation() {
    return (
        <nav>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    );
}

export default Navigation;