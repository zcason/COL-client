import React, { Component } from 'react';
import moment from 'moment';
import './Calendar.css';
import EventList from '../../components/EventList/EventList';


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
        // Check for edge case (when the month is january)
        const selectedMonth = this.state.dateObject.month() - 1;
        const currentMonth = (new Date()).getMonth()
        if (selectedMonth === currentMonth) {
            // set a variable to the current day for filter
        } else {
            // set variable to the first of the month 
        }
        this.setState({
            dateObject: this.state.dateObject.subtract(1, curr)
        });
    };
    onNext = () => {
        let curr = "month";
        const selectedMonth = this.state.dateObject.month() - 1;
        const currentMonth = (new Date()).getMonth()
        if (selectedMonth === currentMonth) {
            // set a variable to the current day for filter
        } else {
            // set variable to the first of the month 
        }
        this.setState({
            dateObject: this.state.dateObject.add(1, curr),
        });
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
            // let currentDay = () => d === this.currentDay() ? "today" : "";
            // let showCurrentDay = "";
            // if (d === this.currentDay()) {
            //     console.log("hello")
            //     showCurrentDay = "today";
            // }
            // ${showCurrentDay}
            console.log(d)
            console.log(this.currentDay())
            if (this.currentDay() === d) {
                console.log('found')
            }
            daysInMonth.push(
                <td key={d} className={`calendar-day `}>
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
                <EventList />
            </>
        );
    }
}



export default Calendar;

