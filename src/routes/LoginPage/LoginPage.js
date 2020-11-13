import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';

class LoginPage extends Component {
    state = {}
    render() {
        return (
            <>
                <h2>Login</h2>
                <LoginForm />
                <p>Not a member? <Link to='/create-account'>Create an account</Link></p>
            </>
        );
    }
}

export default LoginPage;