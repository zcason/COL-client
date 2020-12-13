import React, { Component } from 'react';
import { Button, Input, Required } from '../Utils/Utils';
import AuthApiService from '../../services/auth-api-service';
import { Link } from 'react-router-dom';
import './RegistrationForm.css';

class RegistrationForm extends Component {
    static defaultProps = {
        onRegistrationSuccess: () => { }
    }

    state = { error: null }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({ error: null });
        const { full_name, email, password } = event.target;

        AuthApiService.postRegistration({
            full_name: full_name.value,
            email: email.value,
            password: password.value
        })
            .then(user => {
                this.props.onRegistrationSuccess();
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        return (
            <>
                <Link to='/' className='back-to-login'><p>Back to login</p></Link>
                <h2 className="sign-up">Sign Up</h2>
                <form
                    className='RegistrationForm'
                    onSubmit={this.handleSubmit}
                >
                    <div role='alert'>
                        {this.state.error && <p className='error'>{this.state.error}</p>}
                    </div>
                    <div className='full_name'>
                        <label htmlFor='RegistrationForm__full_name'>
                            Full Name <Required />
                        </label>
                        <Input
                            name='full_name'
                            type='text'
                            required
                            id='RegistrationForm__full_name'>
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
            </>
        );
    }
}

export default RegistrationForm;