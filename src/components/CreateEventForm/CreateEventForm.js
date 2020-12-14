import React, { Component } from 'react';
import { Button, Input } from '../Utils/Utils';
import DateTimePicker from 'react-datetime-picker';
import colApiServices from '../../services/col-api-service'
import moment from 'moment';
import './CreateEventForm.css';



class CreateEventCard extends Component {
    state = {
        error: null,
        eventDate: new Date(),
        wasCreated: false
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            error: null,
            wasCreated: false
        });
        const { eventDate } = this.state;
        const { event_title, event_desc } = event.target;
        if (!eventDate) {
            this.setState({ error: 'Must pick a valid date' });
            return;
        }

        colApiServices.postEvent({
            title: event_title.value,
            event_desc: event_desc.value,
            event_date: moment(eventDate).format()
        })
            .then(event => {
                this.setState({
                    wasCreated: true,
                    eventDate: new Date()
                });

                event_title.value = "";
                event_desc.value = "";
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        return (
            <>
                <h2 className='create-event-title'>Create Event</h2>
                <form
                    className='EventForm'
                    onSubmit={this.handleSubmit}
                >
                    <div>
                        {this.state.wasCreated && <p className='wasCreated'>Event was created</p>}
                    </div>
                    <div role='alert'>
                        {this.state.error && <p className='error'>{this.state.error}</p>}
                    </div>
                    <div className='event_title'>
                        <label htmlFor='event_title'>
                            Title:
                        </label>
                        <Input
                            name='event_title'
                            type='text'
                            required
                            id='event_title'>
                        </Input>
                    </div>
                    <div className='event_desc'>
                        <textarea
                            aria-label='event description'
                            name='event_desc'
                            id="event_desc"
                            cols="20" rows="5"
                            placeholder='Event Description (optional)'></textarea>
                    </div>
                    <div className='event_date'>
                        <label htmlFor='event_date'>
                            Event Date:
                    </label>
                        <div >
                            <DateTimePicker className='date_picker'
                                onChange={value => this.setState({ eventDate: value })}
                                value={this.state.eventDate}
                            />
                        </div>
                    </div>
                    <div className='submit-create'>
                        <Button type='submit'>Create Event</Button>
                    </div>
                </form>
            </>
        );
    }
}

export default CreateEventCard;