import React, { Component } from 'react';
import moment from 'moment';
import './Calendar.css';
import EventList from '../../components/EventList/EventList';

class Calendar extends Component {
    state = {
        dateObject: moment()
    }

    // short names for the days of the week
    weekDaysShort = moment.weekdaysShort();

    // days of the month 
    daysInMonth = () => {
        return this.state.dateObject.daysInMonth();
    };

    // function for retriving the first weekday of the month
    firstDayOfMonth = () => {
        let dateObject = this.state.dateObject;
        let firstDay = moment(dateObject).startOf("month").format("d");


        return firstDay;
    }


    render() {
        // creates a row with the days of the week 
        let weekDayShortName = this.weekDaysShort.map(day => {
            return <th key={day}>{day}</th>
        });

        // creates the empty blocks before the first day of the month 
        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(
                <td className="calendar-day empty">{""}</td>
            );

        };

        // creates blocks for the days in the given month
        let daysInMonth = [];
        for (let d = 1; d <= this.daysInMonth(); d++) {
            daysInMonth.push(
                <td key={d} className="calendar-day">
                    {d}
                </td>
            );
        }

        let totalSlots = [...blanks, ...daysInMonth];
        // rows of the calendar 
        let rows = [];
        // contains each </td> elements to assign to each row 
        let cells = [];

        // creates weekly calandar structure
        totalSlots.forEach((row, i) => {
            // if rows are not equal to 7 then stay in the current week
            if (i % 7 !== 0) {
                cells.push(row);
            } else {
                // once we complete a week (i % 7 === 0), push to rows and start new week
                rows.push(cells);
                cells = [];
                cells.push(row);
            }
            // once the we get to the end of the array add the remaining days to the calendar
            if (i === totalSlots.length - 1) {
                rows.push(cells);
            }
        });

        // wrap the all rows in a jsx element 
        let daysinmonth = rows.map((d, i) => {
            return <tr>{d}</tr>
        });

        return (
            <>
                <h3 className="calendar-label">Calendar</h3>
                <div className="calendar-position">
                    <div className="tail-datetime-calendar">
                        <table className="calendar-date">
                            <thead>
                                <tr>{weekDayShortName}</tr>
                            </thead>
                            <tbody>{daysinmonth}</tbody>
                        </table>
                    </div>
                </div>
                <EventList />

            </>
        );
    }
}
export default Calendar;





