import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import colApiServices from '../../services/col-api-service';
import TokenService from '../../services/token-service';
import { Input } from '../Utils/Utils';
import './ProfileCard.css';


class ProfileCard extends Component {
    state = {
        userName: "",
        userEmail: "",
        accountDeleted: false,
        addingNumber: false,
        phoneNumber: null,
        errorMessage: null
    }

    componentDidMount() {
        colApiServices.getUsersInfo()
            .then(userInfo => this.setState({
                userName: userInfo.full_name,
                userEmail: userInfo.email
            }))
    }

    handleAddNumber = (event) => {
        this.setState({ addingNumber: true})
    }

    handleNumberValidation = (phone) => {
        const phoneNumber = parseInt(phone);

        if (!Number.isInteger(phoneNumber)) {
            this.setState({errorMessage: "Phone number should only contain number."})
        } else {
            this.setState({ errorMessage: null})
        }
    }

    handleDeleteProfile = (event) => {
        event.preventDefault();

        colApiServices.deleteUsersAccount()
        TokenService.clearAuthToken()
        this.setState({ accountDeleted: true });
    }

    render() {
        const { userName, userEmail, accountDeleted, addingNumber, phoneNumber, errorMessage } = this.state;

        const phoneNumberInput = () => {
            return <div className='phone-number-box'>
                    <p>Phone Number:</p>
                    <Input
                        onChange={e => this.handleNumberValidation(e.target.value)}
                        name='phone_number'
                        id='phone_number'
                        placeholder="Enter phone number"
                        type='text'
                        minLength='10'
                        maxLength='10'
                        required
                    />
                </div>
            }

        const numberButtons = () => {
            if (!phoneNumber && addingNumber === false) {
               return <button onClick={this.handleAddNumber}>Add Phone Number</button>
            }
            if (!phoneNumber && addingNumber === true) {
                return <button onClick={this.handleSubmitNumber}>Submit</button>
            }
            if (phoneNumber && addingNumber === false) {
                <button onClick={this.handleDeleteNumber}>Delete</button>
            }
        };

        return (
            <>
                { accountDeleted && (<Redirect to={'/'} />)}
                <h2 className='profile-title'>Profile</h2>
                <div className='profile-card'>
                    <div className='user-info'>
                        <p>{userName}</p>
                        <p>{userEmail}</p>
                    </div >
                    {addingNumber && phoneNumberInput()}
                    {errorMessage && <p className="error-message">{errorMessage}</p> }
                    <div className='profile-buttons'>
                        {numberButtons()}
                        <button onClick={this.handleDeleteProfile}>Delete</button>
                    </div>
                </div>
            </>
        );
    }
}

export default ProfileCard;