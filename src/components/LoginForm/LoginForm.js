import React, { Component } from 'react';
import TokenService from '../../services/token-service';
import { Button, Input } from '../Utils/Utils';
import './LoginForm.css';

class LoginForm extends Component {
    static defualtProps = {
        onLoginSuccess: () => { }
    };

    state = { error: null };

    handleLoginAuth = event => {
        event.preventDefault();
        const { user_email, password } = event.target;

        TokenService.saveAuthToken(
            TokenService.makeBasicAuthToken(user_email.value, password.value)
        );

        user_email.value = '';
        password.value = '';
        this.props.onLoginSuccess()
    }

    render() {
        return (
            <form className='LoginForm' onSubmit={this.handleLoginAuth}>
                <div role='alert'>
                    {this.state.error && <p className='red'>{this.state.error}</p>}
                </div>
                <div className='user_email'>
                    <label htmlFor='LoginForm__email'>
                        Email
                    </label>
                    <Input
                        required
                        name='email'
                        id='LoginForm__email'>
                    </Input>
                </div>
                <div className='password'>
                    <label htmlFor='LoginForm__password'>
                        Password
                        </label>
                    <Input
                        required
                        name='password'
                        type='password'
                        id='LoginForm__password'>
                    </Input>
                    <Button type='submit'>
                        Login
                    </Button>
                </div>
            </form>
        );
    }
}

export default LoginForm;