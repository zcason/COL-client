import React, { Component } from 'react';

import Navbar from '../../components/Navbar/Navbar';
import '../Route.css';


class CreateEventPage extends Component {
    state = {}
    render() {
        return (
            <div className='background-color'>
                <Navbar />
                <h2 style={{ color: "white" }}>Create Event</h2>
            </div >
        );
    }
}

export default CreateEventPage;