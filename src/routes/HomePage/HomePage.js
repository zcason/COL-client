import React, { Component } from 'react';
<<<<<<< HEAD
<<<<<<< Updated upstream

=======
import Calendar from '../../components/Calendar/Calendar';
import Navbar from '../../components/Navbar/Navbar';
import '../Route.css';
>>>>>>> Stashed changes
=======
import Calendar from '../../components/Calendar/Calendar';
import EventList from '../../components/EventList/EventList';
import Navbar from '../../components/Navbar/Navbar';
>>>>>>> 32bbb8be73265cd7c7bafd225aa87165f08c766c

class HomePage extends Component {
    state = {}



    render() {
        return (
<<<<<<< Updated upstream
            <div className='home-page'>
                <Navbar />
                <h2>COL</h2>
<<<<<<< HEAD
=======
            <div className='background-color'>
                <Navbar />
                <Calendar />
>>>>>>> Stashed changes
=======
                <Calendar />
                <EventList />
>>>>>>> 32bbb8be73265cd7c7bafd225aa87165f08c766c
            </div>
        );
    }
}

export default HomePage;