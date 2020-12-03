import React, { Component } from 'react';
import { Button, Input } from '../Utils/Utils';

class LoginForm extends Component {
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
                        Email
                    </label>
                    <Input
                        required
                        name='email'
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
                        Password
                        </label>
                    <Input
                        required
                        name='password'
                        type='password'
<<<<<<< Updated upstream
                        id='LoginForm__password'>
=======
                        id='password'>
>>>>>>> Stashed changes
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