import React, { Component } from 'react';
import colApiServices from '../../services/col-api-service';
import './EventList.css';
import * as MdIcon from 'react-icons/md';
import moment from 'moment';
import _ from 'lodash';
import { paginate } from '../Utils/paginate';



class EventList extends Component {
    state = {
        isExpanded: null,
        pageSize: 3,
        currentPage: 1
    };

    expandeView = eventId => {
        this.setState({ isExpanded: eventId })
    }
    collapseView = () => {
        this.setState({
            isExpanded: null,
        })
    }

    onDeleteEvent = (id) => {
        colApiServices.deleteEvent(id)
            .then(r => { this.props.onDelete(id) })
            .catch(e => {
                throw new Error(`Error deleting folder: ${e.message}`);
            });
    }

    onPageChange = page => {
        this.setState({ currentPage: page });
    }
    render() {
        const { pageSize, currentPage } = this.state;
        const { events } = this.props;
        const { onPageChange, onDeleteEvent } = this;
        const paginatedEvents = paginate(events, currentPage, pageSize);


        const eventItems = paginatedEvents.map(event => {
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
                    {isExpanded &&
                        <p className="event-description">
                            {event.event_desc}
                        </p>}
                    {isExpanded && <div className="buttons-row">
                        <button onClick={() => onDeleteEvent(event.id)}>Delete</button>
                    </div>}
                </div>
            </li>
        });

        // Pagination for events 
        const eventsCount = events.length;
        const pageCount = Math.ceil(eventsCount / pageSize);
        const pages = _.range(1, pageCount + 1);
        const Pagination = pages.map(page => {
            return <div key={page} className={page === currentPage ? "page-number-active" : "page-number"} onClick={() => onPageChange(page)}>
                <p>{page}</p>
            </div>
        });


        return (
            <>
                <h3 className="event-list-title">Events</h3>
                <ul className="event-list">
                    {events.length > 0 ? eventItems : ""}
                </ul>
                {this.props.events.length < 1 && <div>There are no events scheduled.</div>}
                { pageCount > 1 && <div className="paginator">
                    {Pagination}
                </div>}
            </>
        );
    }
}

export default EventList;