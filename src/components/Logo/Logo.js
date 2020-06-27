import React from 'react';

import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css'

const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} style={{height: props.height}} alt="MyBurger"></img>
    </div>
);

export default Logo;