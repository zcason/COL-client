import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import '../Route.css';


class ProfilePage extends Component {
    state = {}
    render() {
        return (
            <div className='background-color'>
                <Navbar />
                <h2 style={{ color: "white" }}>Profile</h2>
            </div>
        );
    }
}

export default ProfilePage;

