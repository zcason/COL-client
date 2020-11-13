import React, { Component } from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';


class RegistrationPage extends Component {
    state = {}
    render() {
        return (
            <>
                <h2>Create Account</h2>
                <RegistrationForm />
            </>
        );
    }
}

export default RegistrationPage;