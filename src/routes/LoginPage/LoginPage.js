import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';

class LoginPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => { },
        },
    }

    handleLoginSuccess = () => {
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/home'
        history.push(destination)
    }

    render() {
        return (
            <>
                <h2>Login</h2>
                <LoginForm onLoginSuccess={this.handleLoginSuccess} />
                <p>Not a member? <Link to='/create-account'>Create an account</Link></p>
            </>
        );
    }
}

export default LoginPage;