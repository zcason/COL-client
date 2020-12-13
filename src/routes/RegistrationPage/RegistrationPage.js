import React, { Component } from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import TokenService from '../../services/token-service';
import '../Route.css';


class RegistrationPage extends Component {
    static defaultProps = {
        history: {
            push: () => { },
        },
    }

    handleRegistrationSuccess = user => {
        TokenService.clearAuthToken();
        const { history } = this.props
        history.push('/')
    }

    render() {
        return (
            <div className="background-color">
                <RegistrationForm onRegistrationSuccess={this.handleRegistrationSuccess} />
            </div>
        );
    }
}

export default RegistrationPage;