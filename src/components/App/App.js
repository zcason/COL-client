import './App.css';
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../../routes/LoginPage/LoginPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import HomePage from '../../routes/HomePage/HomePage';
import ProfilePage from '../../routes/ProfilePage/ProfilePage';
import CreateEventPage from '../../routes/CreateEventPage/CreateEventPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';
import PublicOnlyRoute from '../Utils/PrivateRoute';
import PrivateRoute from '../Utils/PublicRoute';

class App extends Component {
  state = { hasError: false }

  static getDerividStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>COL</h2>
        </header>
        <main className="App-main">
          {this.state.hasError && <p className='red'>There was an error! Oh no!</p>}
          <div className='center'>
            <Switch>
              {/* will be a public route (available to all user) */}
              <PublicOnlyRoute
                exact
                path={'/'}
                component={LoginPage}
              />
              {/* will be a public route (available to all user) */}
              <PublicOnlyRoute
                path={'/create-account'}
                component={RegistrationPage}
              />
              {/* will be a private route (available to ONLY logged in users) */}
              <PrivateRoute
                path={'/home'}
                component={HomePage}
              />
              {/* will be a private route (available to ONLY logged in users) */}
              <PrivateRoute
                path={'/profile'}
                component={ProfilePage}
              />
              {/* will be a private route (available to ONLY logged in users) */}
              <PrivateRoute
                path={'/create-event'}
                component={CreateEventPage}
              />
              {/* 404 page cannot be found */}
              <Route
                component={NotFoundPage}
              />
            </Switch>
          </div>
        </main>
      </div>
    )
  }
}

export default App;

