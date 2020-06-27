import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.module.css'

import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignUp: true
    }

    componentDidMount() {
        if (!this.props.building && this.props.authRedirect !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity(value, rules) {
        if (rules.required && (value.trim() === '')) {
            return false;
        }
        if (rules.minLength && value.length < rules.minLength) {
            return false;
        }
        if (rules.maxLength && value.length > rules.maxLength) {
            return false;
        }
        return true;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value,
                    this.state.controls[controlName].validation),
                touched: true
            }
        }
        this.setState({ controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignUp);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp }
        })
    }
    render() {
        const formElements = [];
        for (let key in this.state.controls) {
            formElements.push({ id: key, config: this.state.controls[key] });
        }
        let form = formElements.map(el => (
            <Input
                key={el.id}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                changed={(event) => this.inputChangedHandler(event, el.id)}
                value={el.config.value}
                invalid={!el.config.valid}
                shouldValidate={el.config.validation}
                touched={el.config.touched}
            />
        ));

        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>
        }

        let authRedirect = null;

        if (this.props.isAuth) {
            authRedirect = <Redirect to={this.props.authRedirect} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token ? true : false,
        building: state.burgerBuilder.building,
        authRedirect: state.auth.authRedirectPath
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);