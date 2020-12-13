import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import colApiServices from '../../services/col-api-service';
import TokenService from '../../services/token-service';
import './ProfileCard.css';


class ProfileCard extends Component {
    state = {
        userName: "",
        userEmail: "",
        accountDeleted: false
    }

    componentDidMount() {
        colApiServices.getUsersInfo()
            .then(userInfo => this.setState({
                userName: userInfo.full_name,
                userEmail: userInfo.email
            }))
    }

    handleDeleteProfile = (event) => {
        event.preventDefault();

        colApiServices.deleteUsersAccount()
        TokenService.clearAuthToken()
        this.setState({ accountDeleted: true });
    }

    render() {
        const { userName, userEmail, accountDeleted } = this.state;
        return (
            <>
                { accountDeleted && (<Redirect to={'/'} />)}
                <h2 className="profile-title">Profile</h2>
                <div className="profile-card">
                    <div className="user-info">
                        <p>{userName}</p>
                        <p>{userEmail}</p>
                    </div>
                    <button onClick={this.handleDeleteProfile}>Delete</button>
                </div>
            </>
        );
    }
}

export default ProfileCard;