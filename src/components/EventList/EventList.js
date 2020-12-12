import React, { Component } from 'react';
import './EventList.css';
import * as MdIcon from 'react-icons/md';
import moment from 'moment';
// import axios from 'axios';
// import ReactPaginate from 'react-paginate';


class EventList extends Component {
    state = {
        isExpanded: null,
        isEditing: false,
        // perPage: 3,
    };

    expandeView = (eventId) => {
        this.setState({ isExpanded: eventId })
    }
    collapseView = () => {
        this.setState({
            isExpanded: null,
            isEditing: false
        })
    }

    editHandler = () => {
        this.setState({ isEditing: true })
    }

    submitPatch = () => {
        // below create a patch request and set isEditing to false

        this.setState({ isEditing: null })
    }

    render() {
        const { isEditing } = this.state;

        // create a filtered list that returns the events on that date

        const eventItems = this.props.events.map(event => {
            const isExpanded = this.state.isExpanded === event.id;
            return <li key={event.id} className="event">

                <div className="icon-row">
                    {!isExpanded && <MdIcon.MdExpandMore className="icon" onClick={() => this.expandeView(event.id)} />}
                    {isExpanded && <MdIcon.MdExpandLess className="icon" onClick={this.collapseView} />}
                </div>
                <div className="title-date-row">
                    <p>{event.title}</p>
                    <p>{moment(event.event_date).format('MMMM Do YYYY, h:mm a')}</p>
                </div>
                <div>
                    {(isExpanded && !isEditing) &&
                        <p className="event-description">
                            {!event.event_desc ? 'This event has no description.' : event.event_desc}
                        </p>}
                    {(isEditing && isExpanded) && <textarea></textarea>}
                    {isExpanded && <div className="buttons-row">
                        {!isEditing && <button onClick={this.editHandler}>Edit</button>}
                        {isEditing && <button onClick={this.submitPatch}>Submit</button>}
                        <button>Delete</button>
                    </div>}
                </div>
            </li>
        });

        // Pagination


        return (

            <>
                <h3 className="event-list-title">Events</h3>
                <ul className="event-list">
                    {this.props.events.length > 0 ? eventItems : ""}
                </ul>
                {this.props.events.length < 1 && <div>There are no events scheduled.</div>}
            </>
        );
    }
}

export default EventList;