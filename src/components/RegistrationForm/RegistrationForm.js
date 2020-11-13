import React, { Component } from 'react'
import { Button, Input, Required } from '../Utils/Utils'


class RegistrationForm extends Component {
    state = {}

    handleSubmit = event => {
        event.preventDefault();
        const { first_name, last_name, email, password } = event.target;

        // combines first and last name for post request and future displays
        const fullName = `${first_name.value} ${last_name.value}`;

        console.log(fullName, email.value, password.value);

        // resets the registration fields
        first_name.value = '';
        last_name.value = '';
        email.value = '';
        password.value = '';
    }

    render() {
        return (
            <form
                className='RegistrationForm'
                onSubmit={this.handleSubmit}
            >
                <div className='first_name'>
                    <label htmlFor='RegistrationForm__first_name'>
                        First name <Required />
                    </label>
                    <Input
                        name='first_name'
                        type='text'
                        required
                        id='RegistrationForm__first_name'>
                    </Input>
                </div>
                <div className='last_name'>
                    <label htmlFor='RegistrationForm__last_name'>
                        Last name <Required />
                    </label>
                    <Input
                        name='last_name'
                        type='text'
                        required
                        id='RegistrationForm__Last_name'>
                    </Input>
                </div>
                <div className='email'>
                    <label htmlFor='RegistrationForm__email'>
                        Email <Required />
                    </label>
                    <Input
                        name='email'
                        type='text'
                        required
                        id='RegistrationForm__email'>
                    </Input>
                </div>
                <div className='password'>
                    <label htmlFor='RegistrationForm__password'>
                        Password <Required />
                    </label>
                    <Input
                        name='password'
                        type='password'
                        required
                        id='RegistrationForm__password'>
                    </Input>
                </div>
                <Button type='submit'>
                    Register
                </Button>
            </form>
        );
    }
}

export default RegistrationForm;