import React, { Component } from 'react';
import './EventList.css';
import * as BoxIcon from "react-icons/bi";


class EventList extends Component {
    state = {
        // for full view conditonal rendering
        isExpanded: false,
        // for editing conditonal (nest inside of full view conditon)
        isEditing: false
    };

    expandeView = () => {
        this.setState({ isExpanded: true })
    }
    collapseView = () => {
        this.setState({
            isExpanded: false,
            isEditing: false
        })
    }

    editHandler = () => {
        this.setState({ isEditing: true })
    }

    submitPatch = () => {
        // below create a patch request and set isEditing to false

        this.setState({ isEditing: false })
    }

    render() {
        const { isExpanded, isEditing } = this.state;

        const eventItem = <li className="event">
            <div className="icon-row">
                {!isExpanded && <BoxIcon.BiExpand className="icon" onClick={this.expandeView} />}
                {isExpanded && <BoxIcon.BiCollapse className="icon" onClick={this.collapseView} />}
            </div>
            <div className="title-date-row">
                <p>Title</p>
                <p>1/10/21</p>
            </div>
            <div>
                {(isExpanded && !isEditing) && <p className="event-description">hello </p>}
                {isEditing && <textarea></textarea>}
                {isExpanded && <div className="buttons-row">
                    {!isEditing && <button onClick={this.editHandler}>Edit</button>}
                    {isEditing && <button onClick={this.submitPatch}>Submit</button>}
                    <button>Delete</button>
                </div>}
            </div>
        </li>;

        return (

            <>
                <h3 className="event-list-title">Events</h3>
                <ul className="event-list">
                    {eventItem}
                    {eventItem}
                </ul>
            </>
        );
    }
}

export default EventList;