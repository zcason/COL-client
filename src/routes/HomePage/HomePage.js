import React, { Component } from 'react';
import Calendar from '../../components/Calendar/Calendar';
import EventList from '../../components/EventList/EventList';
import Navbar from '../../components/Navbar/Navbar';

class HomePage extends Component {
    state = {}



    render() {
        return (
            <div className='home-page'>
                <Navbar />
                <h2>COL</h2>
                <Calendar />
                <EventList />
            </div>
        );
    }
}

export default HomePage;