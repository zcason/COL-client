import React, { Component } from 'react';
import { Button, Input } from '../Utils/Utils'



class CreateEventCard extends Component {
    state = {}



    handleSubmit = event => {
        event.preventDefault();
        const { event_title, event_desc, event_date } = event.target;


        // resets the form fields
        event_title.value = '';
        event_desc.value = '';
        event_date.value = '';
    }

    render() {
        return (<form
            className='RegistrationForm'
            onSubmit={this.handleSubmit}
        >
            <div className='event_title'>
                <label htmlFor='event_title'>
                    Title
                </label>
                <Input
                    name='event_title'
                    type='text'
                    required
                    id='event_title'>
                </Input>
            </div>
            <div className='event_desc'>
                <label htmlFor='event_desc'>
                    Event Description
                </label>
                <Input
                    name='event_desc'
                    type='text'
                    id='event_desc'>
                </Input>
            </div>
            <div className='event_date'>
                <label htmlFor='event_date'>
                    Event Date
                </label>
                {/* <Input
                    name='email'
                    type='text'
                    required
                    id='RegistrationForm__email'>
                </Input> */}
            </div>
            <Button type='submit'>
                Create Event
            </Button>
        </form>);
    }
}

export default CreateEventCard;