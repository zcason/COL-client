import './Navbar.css'
import React, { Component } from 'react';
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import { Link } from 'react-router-dom';
import NavbarItems from './NavbarItems';
import TokenService from '../../services/token-service';


class Navbar extends Component {
    state = {
        showSidebar: false
    };

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
    };

    handleSidebar = () => {
        this.setState({ showSidebar: !this.state.showSidebar });
    };

    render() {
        return (
            <>
                <div className='navbar'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={this.handleSidebar} />
                    </Link>
                    <h2 className="app-title">COL</h2>
                </div>
                <nav className={this.state.showSidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={this.handleSidebar}>
                        <li className='navbar-toggle'>
                            <Link to='#' className='menu-bars'>
                                <MdIcons.MdClose />
                            </Link>
                        </li>
                        {/* map through the Navbar items and create li and link tag for all of them */}
                        {NavbarItems.map((item, index) => {
                            return (
                                // keys are used to identify each item (using index as param because items are static)
                                <li key={index} className={item.itemClass}>
                                    <Link to={item.path}>
                                        {item.title}
                                    </Link>
                                </li>
                            );
                        })
                        }
                        <li className='nav-text'>
                            <Link to='/' onClick={this.handleLogoutClick}>
                                Logout
                            </Link>
                        </li>
                    </ul>
                </nav>
            </>
        );
    };
};

export default Navbar;
