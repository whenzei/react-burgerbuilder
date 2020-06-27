import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/BackDrop';

const SideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.showDrawer) {
        attachedClasses= [classes.SideDrawer, classes.Open];
    }

    return (
        <React.Fragment>
            <Backdrop show={props.showDrawer} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>
            </div>
        </React.Fragment>
    );
}

export default SideDrawer;