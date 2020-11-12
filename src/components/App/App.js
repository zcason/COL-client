import './App.css';
import React, { Component } from 'react';
import { Route, Switch } from 'react-dom';
import LoginPage from '../../routes/LoginPage/LoginPage';
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage';
import HomePage from '../../routes/HomePage/HomePage';
import CreateEventPage from '../../routes/CreateEventPage/CreateEventPage';
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage';

class App extends Component {
  state = {}
  render() {
    return (
      <div className="App">
        <header className="App-header"></header>
        <main className="App-main">
          <Switch>
            {/* will be a public route (available to all user) */}
            <Route
              path={'/login'}
              component={LoginPage}
            />
            {/* will be a public route (available to all user) */}
            <Route
              path={'/registration'}
              component={RegistrationPage}
            />
            {/* will be a private route (available to ONLY logged in users) */}
            <Route
              path={'/'}
              component={HomePage}
            />
            {/* will be a private route (available to ONLY logged in users) */}
            <Route
              path={'/create-event'}
              component={CreateEventPage}
            />
            {/* will be a private route (available to ONLY logged in users) */}
            <Route
              component={NotFoundPage}
            />
          </Switch>
        </main>
      </div>);
  }
}

export default App;
