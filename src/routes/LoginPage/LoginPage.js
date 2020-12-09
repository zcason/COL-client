import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import moment from 'moment';


class LoginPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => { },
        },
    }

    handleLoginSuccess = () => {
        const m = moment();
        const startOfCurrentMonth = m.startOf('month').format('YYYY-MM-DD')
        const endOfCurrentMonth = m.endOf('month').format('YYYY-MM-DD')

        const { history } = this.props
        const destination = `/home/${startOfCurrentMonth}/${endOfCurrentMonth}`
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