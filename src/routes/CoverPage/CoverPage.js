import './CoverPage.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class CoverPage extends Component {

    render() {
        return (
            <div className="cover-background">
                <div className="top-section">
                    <h2>COL</h2>
                    <p>Your Cognitive Off-Loading Assistant</p>
                </div>
                <div className="middle-section">
                    <h3>What is COL?</h3>
                    <p>COL or Cognitive Off-Loader is a web app for people with busy schedules looking to
                        free up some of their mental capacity by bookmarking future events in a safe place.</p>
                </div>
                <div className="last-section">
                    <p>Ready to get started? Click on one of the buttons below.</p>
                    <div className="demo-info">
                        <p>To view demo:</p>
                        <p>Email: dunder.mifflin@gmail.com</p>
                        <p>Password: password3</p>
                    </div>
                    <div>
                        <Link to={'/login'}>
                            <button>Login</button>
                        </Link>
                        <Link to={'/create-account'}>
                            <button>Register</button>
                        </Link>
                        <p>COL isn't just for the busy! Anyone can join!</p>
                    </div>
                </div>
                <div />
            </div>
        );
    }
}

export default CoverPage;