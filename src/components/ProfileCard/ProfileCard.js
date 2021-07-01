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
            .then(userInfo => {
                if (userInfo.users_number) this.setState({ phoneNumber: userInfo.users_number });
                this.setState({
                    userName: userInfo.full_name,
                    userEmail: userInfo.email,
                })
            })
            
    }

    handleAddNumber = (event) => {
        this.setState({ addingNumber: true })
    }

    handleNumberValidation = (phone) => {
        const phoneNumber = parseInt(phone);

        if (!Number.isInteger(phoneNumber)) {
            this.setState({errorMessage: "Phone number should only contain numbers."})
        } else {
            this.setState({ errorMessage: null})
        }
    }

    handleSubmitNumber = (event) => {
        event.preventDefault();
        const inputValue = document.getElementById("phone_number").value;

        if (inputValue.length !== 10){
            this.setState({errorMessage: "Phone number should be 10 characters long."})
        } else {
            const number = parseInt(inputValue);
            colApiServices.postPhoneNumber({users_number: number}).then(res => {
                this.setState({
                    addingNumber: false,
                    phoneNumber: res.users_number,
                    errorMessage: false
                });
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
        }
    }

    handleDeleteNumber = (event) => {
        event.preventDefault();

        this.setState({
            phoneNumber: null
        })
        // console.log('deleted number')
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
            };

        const numberButtons = () => {
            if (!phoneNumber && addingNumber === false) {
               return <button onClick={this.handleAddNumber}>Add Phone Number</button>
            }
            if (!phoneNumber && addingNumber === true) {
                return <button onClick={this.handleSubmitNumber}>Submit</button>
            }
            if (phoneNumber && addingNumber === false) {
                return <button onClick={this.handleDeleteNumber}>Delete Phone Number</button>
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
                        {phoneNumber && <p>{phoneNumber}</p>}
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