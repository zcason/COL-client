import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import { Button, Input } from '../Utils/Utils';
import './LoginForm.css';

class LoginForm extends Component {
<<<<<<< HEAD
<<<<<<< Updated upstream
    state = {}
    render() {
        return (
            <form>
                <div className='user_name'>
                    <label htmlFor='LoginForm__email'>
=======
    static defualtProps = {
        onLoginSuccess: () => { }
    };

    state = { error: null };

    handleLoginAuth = event => {
        event.preventDefault();
        this.setState({ error: null })
        const { email, password } = event.target;

        AuthApiService.postLogin({
            email: email.value,
            password: password.value
        })
            .then(res => {
                email.value = ''
                password.value = ''
                TokenService.saveAuthToken(res.authToken)
                this.props.onLoginSuccess()
            })
            .catch(res => {
                console.log(res)
                this.setState({ error: res.error })

            })
    }

    render() {
        return (
            <form className='LoginForm' onSubmit={this.handleLoginAuth}>
                <div className='user-email'>
                    <label htmlFor='email'>
>>>>>>> Stashed changes
=======
    static defualtProps = {
        onLoginSuccess: () => { }
    };

    state = { error: null };

    handleLoginAuth = event => {
        event.preventDefault();
        this.setState({ error: null })
        const { login_email, login_password } = event.target;

        AuthApiService.postLogin({
            login_email: login_email.value,
            login_password: login_password.value
        })
            .then(res => {
                login_email.value = ''
                login_password.value = ''
                TokenService.saveAuthToken(res.authToken)
                this.props.onLoginSuccess()
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        return (
            <form className='LoginForm' onSubmit={this.handleLoginAuth}>
                <div role='alert'>
                    {this.state.error && <p className='red'>{this.state.error}</p>}
                </div>
                <div className='user_email'>
                    <label htmlFor='login_email'>
>>>>>>> 32bbb8be73265cd7c7bafd225aa87165f08c766c
                        Email
                    </label>
                    <Input
                        required
                        name='email'
<<<<<<< HEAD
<<<<<<< Updated upstream
                        id='LoginForm__email'>
                    </Input>
                </div>
                <div className='password'>
                    <label htmlFor='LoginForm__password'>
=======
                        id='email'>
                    </Input>
                </div>
                <div className='user-password'>
                    <label htmlFor='password'>
>>>>>>> Stashed changes
=======
                        id='login_email'>
                    </Input>
                </div>
                <div className='password'>
                    <label htmlFor='login_password'>
>>>>>>> 32bbb8be73265cd7c7bafd225aa87165f08c766c
                        Password
                        </label>
                    <Input
                        required
                        name='password'
                        type='password'
<<<<<<< HEAD
<<<<<<< Updated upstream
                        id='LoginForm__password'>
=======
                        id='password'>
>>>>>>> Stashed changes
=======
                        id='login_password'>
>>>>>>> 32bbb8be73265cd7c7bafd225aa87165f08c766c
                    </Input>
                    <Button type='submit'>
                        Login
                    </Button>
                </div>
                <div role='alert'>
                    {this.state.error && <p className='red'>{this.state.error}</p>}
                </div>
            </form>
        );
    }
}

export default LoginForm;