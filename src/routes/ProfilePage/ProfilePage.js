import React, { Component } from 'react';
<<<<<<< HEAD
<<<<<<< Updated upstream
=======
import Navbar from '../../components/Navbar/Navbar';
>>>>>>> 32bbb8be73265cd7c7bafd225aa87165f08c766c

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
                <Navbar />
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