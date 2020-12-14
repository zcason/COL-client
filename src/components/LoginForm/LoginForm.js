import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthApiService from '../../services/auth-api-service';
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
        this.setState({ error: null });
        const { login_email, login_password } = event.target;

        AuthApiService.postLogin({
            email: login_email.value,
            password: login_password.value
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
            <>
                <Link to={'/'} className='back-to-cover'>Back to cover page</Link>
                <h2 className="login">Login</h2>
                <form className='LoginForm' onSubmit={this.handleLoginAuth}>
                    <div role='alert'>
                        {this.state.error && <p className='error'>{this.state.error}</p>}
                    </div>
                    <div className='user_email'>
                        <label htmlFor='login_email'>
                            Email
                    </label>
                        <Input
                            required
                            name='email'
                            id='login_email'>
                        </Input>
                    </div>
                    <div className='password'>
                        <label htmlFor='login_password'>
                            Password
                        </label>
                        <Input
                            required
                            name='password'
                            type='password'
                            id='login_password'>
                        </Input>
                    </div>
                    <Button type='submit'>
                        Login
                    </Button>
                    <div className="sign-up-link">
                        <p>Not a member? <Link to='/create-account'>Create an account</Link></p>
                    </div>
                </form>
            </>
        );
    }
}

export default LoginForm;