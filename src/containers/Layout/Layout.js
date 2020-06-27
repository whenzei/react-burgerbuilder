import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showDrawer: false,
    }

    sideDrawerCloseHandler = () => {
        this.setState({ showDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState(prevState => {
            return { showDrawer: !prevState.showDrawer };
        });
    }

    render() {
        return (
            <React.Fragment>
                <Toolbar
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                    isAuth={this.props.isAuthenticated} />
                <SideDrawer
                    showDrawer={this.state.showDrawer}
                    closed={this.sideDrawerCloseHandler}
                    isAuth={this.props.isAuth} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
    }

};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token ? true : false
    }
}

export default connect(mapStateToProps)(Layout);