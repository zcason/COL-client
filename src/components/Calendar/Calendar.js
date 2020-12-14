import React, { Component } from 'react';
import moment from 'moment';
import './Calendar.css';
import EventList from '../../components/EventList/EventList';
import colApiServices from '../../services/col-api-service';
import { v4 as uuidv4 } from 'uuid';

class Calendar extends Component {
    weekdayshort = moment.weekdaysShort();

    state = {
        dateObject: moment(),
        allmonths: moment.months(),
        showYearNav: false,
        events: [],
        filteredEvents: [],
    };

    getEventsByMonth = (month) => {
        const begin_date = month.startOf('month').format('YYYY-MM-DD');
        const end_date = month.endOf('month').format('YYYY-MM-DD');

        colApiServices.getEvents(begin_date, end_date)
            .then(usersEvents => this.setState({
                events: usersEvents,
                filteredEvents: usersEvents
            }));

        if (month.startOf('month').format() === moment().startOf('month').format()) {
            this.setState({ dateObject: moment() });
        } else {
            this.setState({ dateObject: month.startOf('month') });
        }
    }

    componentDidMount() {
        const today = moment();

        this.getEventsByMonth(today)
    }


    // days of the month 
    daysInMonth = () => {
        return this.state.dateObject.daysInMonth();
    };

    // get the year
    year = () => {
        return this.state.dateObject.format("Y");
    };

    //get the current day
    selectedDay = () => {
        return this.state.dateObject.format("D");
    };

    // function for retriving the first weekday of the month
    firstDayOfMonth = () => {
        let dateObject = this.state.dateObject;
        let firstDay = moment(dateObject)
            .startOf("month")
            .format("d");
        return firstDay;
    };

    // method for retrieving the month
    month = () => {
        return this.state.dateObject.format("MMMM");
    };



    setMonth = month => {
        let monthNo = this.state.allmonths.indexOf(month);
        let dateObject = Object.assign({}, this.state.dateObject);
        dateObject = moment(dateObject).set("month", monthNo);
        this.setState({
            dateObject: dateObject,
        });
    };


    onPrev = () => {
        let curr = "month";
        const { dateObject } = this.state;

        this.setState({
            dateObject: dateObject.subtract(1, curr),
        });

        this.getEventsByMonth(dateObject);
    };
    onNext = () => {
        let curr = "month";
        const { dateObject } = this.state;

        this.setState({
            dateObject: this.state.dateObject.add(1, curr),
        });

        this.getEventsByMonth(dateObject);
    };
    setYear = year => {
        let dateObject = Object.assign({}, this.state.dateObject);
        dateObject = moment(dateObject).set("year", year);
        this.setState({
            dateObject: dateObject,
        });
    };

    onYearChange = e => {
        this.setYear(e.target.value);
    };

    getDates(startDate, stopDate) {
        var dateArray = [];
        var currentDate = moment(startDate);
        var endDate = moment(stopDate);
        while (currentDate <= endDate) {
            dateArray.push(moment(currentDate).format("YYYY"));
            currentDate = moment(currentDate).add(1, "year");
        }
        return dateArray;
    }

    onDayClick = (e, d) => {
        let pickedDay = d;
        const { dateObject, events } = this.state;
        const { selectedDay } = this;
        if (pickedDay > selectedDay()) {
            const sum = pickedDay - selectedDay();
            const calendarDay = dateObject.add(sum, 'day');
            this.setState({
                dateObject: calendarDay,
                filteredEvents: events.filter(event =>
                    moment(event.event_date).format('D') === calendarDay.format('D'))
            });

        }
        if (pickedDay < selectedDay()) {
            const sum = selectedDay() - pickedDay;
            const calendarDay = dateObject.subtract(sum, 'day');
            this.setState({
                dateObject: calendarDay,
                filteredEvents: events.filter(event =>
                    moment(event.event_date).format('D') === calendarDay.format('D'))
            });
        }
    };

    handleDeleted = (id) => {
        this.setState({
            events: this.state.events.filter(currentEvent => {
                return currentEvent.id !== id
            }),
            filteredEvents: this.state.filteredEvents.filter(currentEvent => {
                return currentEvent.id !== id
            })
        });
    }

    render() {
        // short names for the days of the week
        let weekdayshortname = this.weekdayshort.map(day => {
            return <th key={day}>{day}</th>;
        });

        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<td className="calendar-day empty">{""}</td>);
        }

        const daysWithevents = [];
        this.state.events.forEach(event =>
            daysWithevents.push(moment(event.event_date).format("D"))
        );

        let daysInMonth = [];

        for (let d = 1; d <= this.daysInMonth(); d++) {
            let hasEvent = daysWithevents.includes(d.toString()) ? "has-event" : "";
            // eslint-disable-next-line eqeqeq
            let showSelectedDay = d == this.selectedDay() ? "today" : "";
            daysInMonth.push(
                <td key={d} className={`calendar-day  ${showSelectedDay}`} id={`${hasEvent}`}>
                    <span
                        onClick={e => {
                            this.onDayClick(e, d);
                        }}
                    >
                        {d}
                    </span>
                </td>
            );
        }
        var totalSlots = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];

        totalSlots.forEach((row, i) => {
            if (i % 7 !== 0) {
                cells.push(row);
            } else {
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
            if (i === totalSlots.length - 1) {
                rows.push(cells);
            }
        });

        let daysinmonth = rows.map((d, i) => {
            return <tr key={uuidv4()}>{d}</tr>;
        });

        return (
            <>
                <h3 className="calendar-title">Calendar</h3>
                <div className="calendar-position">
                    <div className="tail-datetime-calendar">
                        <div className="calendar-navi">
                            <span
                                onClick={e => {
                                    this.onPrev();
                                }}
                                className="calendar-button button-prev"
                            />

                            <span
                                className="calendar-label"
                            >
                                {this.month()}
                            </span>
                            <span
                                className="calendar-label"
                            >
                                {this.year()}
                            </span>

                            <span
                                onClick={e => {
                                    this.onNext();
                                }}
                                className="calendar-button button-next"
                            />
                        </div>

                        <div className="calendar-date">
                            <table className="calendar-day">
                                <thead>
                                    <tr>{weekdayshortname}</tr>
                                </thead>
                                <tbody >{daysinmonth}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <EventList events={this.state.filteredEvents} onDelete={this.handleDeleted} />
            </>
        );
    }
}



export default Calendar;

