import React, { Component } from 'react';
<<<<<<< Updated upstream

=======
import Navbar from '../../components/Navbar/Navbar';
import '../Route.css';
>>>>>>> Stashed changes

class ProfilePage extends Component {
    state = {}
    render() {
        return (
<<<<<<< Updated upstream
            <div>
                <h2>Profile</h2>
=======
            <div className='background-color'>
                <Navbar />
                <h2 style={{ color: "white" }}>Profile</h2>
>>>>>>> Stashed changes
            </div>
        );
    }
}

export default ProfilePage;