import React, { Component } from 'react';
<<<<<<< Updated upstream

=======
import Calendar from '../../components/Calendar/Calendar';
import Navbar from '../../components/Navbar/Navbar';
import '../Route.css';
>>>>>>> Stashed changes

class HomePage extends Component {
    state = {}
    render() {
        return (
<<<<<<< Updated upstream
            <div className='home-page'>
                <h2>COL</h2>
=======
            <div className='background-color'>
                <Navbar />
                <Calendar />
>>>>>>> Stashed changes
            </div>
        );
    }
}

export default HomePage;