import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import '../Route.css';


class ProfilePage extends Component {

    render() {
        return (
            <div className='background-color'>
                <Navbar />
                <ProfileCard />
            </div>
        );
    }
}

export default ProfilePage;

