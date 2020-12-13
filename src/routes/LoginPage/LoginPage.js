import React, { Component } from 'react';
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

        const { history } = this.props;
        const destination = `/home/${startOfCurrentMonth}/${endOfCurrentMonth}`;
        history.push(destination)
    }

    render() {
        return (
            <div className="background-color">
                <LoginForm onLoginSuccess={this.handleLoginSuccess} />
            </div>
        );
    }
}

export default LoginPage;