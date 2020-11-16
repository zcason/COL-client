import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar';


class HomePage extends Component {
    state = {}
    render() {
        return (
            <div className='home-page'>
                <Navbar />
                <h2>COL</h2>
            </div>
        );
    }
}

export default HomePage;