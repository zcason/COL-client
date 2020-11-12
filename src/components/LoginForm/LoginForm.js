import React, { Component } from 'react';
import { Button, Input } from '../Utils/Utils';

class LoginForm extends Component {
    state = {}
    render() {
        return (
            <form>
                <div className='user_name'>
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