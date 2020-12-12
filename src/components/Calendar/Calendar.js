import React, { Component } from 'react';
import moment from 'moment';
import './Calendar.css';
import EventList from '../../components/EventList/EventList';
import colApiServices from '../../services/col-api-service'

class Calendar extends Component {
    weekdayshort = moment.weekdaysShort();

    state = {
        showCalendarTable: true,
        showMonthTable: false,
        dateObject: moment(),
        allmonths: moment.months(),
        showYearNav: false,
        selectedDay: null,
        events: [],
    };

    getEventsByMonth = (month) => {
        const begin_date = month.startOf('month').format('YYYY-MM-DD');
        const end_date = month.endOf('month').format('YYYY-MM-DD');

        colApiServices.getEvents(begin_date, end_date)
            .then(usersEvents => this.setState({ events: usersEvents }));

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
    currentDay = () => {
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


    showMonth = (e, month) => {
        this.setState({
            showMonthTable: !this.state.showMonthTable,
            showCalendarTable: !this.state.showCalendarTable
        });
    };

    setMonth = month => {
        let monthNo = this.state.allmonths.indexOf(month);
        let dateObject = Object.assign({}, this.state.dateObject);
        dateObject = moment(dateObject).set("month", monthNo);
        this.setState({
            dateObject: dateObject,
            showMonthTable: !this.state.showMonthTable,
            showCalendarTable: !this.state.showCalendarTable
        });
    };

    showYearEditor = () => {
        this.setState({
            showYearNav: true,
            showCalendarTable: !this.state.showCalendarTable
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
            showMonthTable: !this.state.showMonthTable,
            showYearNav: !this.state.showYearNav,
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

    // get request for selected day 
    onDayClick = (e, d) => {
        this.setState(
            {
                selectedDay: d
            },
            () => {
                console.log("SELECTED DAY: ", this.state.selectedDay);
                // const firstEvent = this.state.events[0];
                // const eventDate = moment(firstEvent.event_date).format('MMMM Do YYYY, h:mm a')
                // console.log(`date: ${eventDate}`)
            }
        );
    };

    render() {
        // short names for the days of the week
        let weekdayshortname = this.weekdayshort.map(day => {
            return <th key={day}>{day}</th>;
        });
        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(<td className="calendar-day empty">{""}</td>);
        }
        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            // eslint-disable-next-line eqeqeq
            let showCurrentDay = d == this.currentDay() ? "today" : "";
            daysInMonth.push(
                <td key={d} className={`calendar-day  ${showCurrentDay}`}>
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
            return <tr>{d}</tr>;
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
                            {!this.state.showMonthTable && !this.state.showYearEditor && (
                                <span
                                    className="calendar-label"
                                >
                                    {this.month()}
                                </span>
                            )}
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
                            {this.state.showYearNav && <this.YearTable props={this.year()} />}
                            {this.state.showMonthTable && (
                                <this.MonthList data={moment.months()} />
                            )}
                        </div>

                        {this.state.showCalendarTable && (
                            <div className="calendar-date">
                                <table className="calendar-day">
                                    <thead>
                                        <tr>{weekdayshortname}</tr>
                                    </thead>
                                    <tbody>{daysinmonth}</tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
                <EventList events={this.state.events} />
            </>
        );
    }
}



export default Calendar;

