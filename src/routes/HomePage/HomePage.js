import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Calendar from '../../components/Calendar/Calendar';
import '../Route.css';


class HomePage extends Component {
    render() {
        return (
            <div className='background-color'>
                <Navbar />
                <Calendar />
            </div>
        );
    }
}

export default HomePage;