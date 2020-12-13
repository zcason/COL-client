import React, { Component } from 'react';
import CreateEventForm from '../../components/CreateEventForm/CreateEventForm';
import Navbar from '../../components/Navbar/Navbar';
import '../Route.css';


class CreateEventPage extends Component {
    state = {}
    render() {
        return (
            <div className='background-color'>
                <Navbar />
                <CreateEventForm />
            </div >
        );
    }
}

export default CreateEventPage;