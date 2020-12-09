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
        <header></header>
        <main className="App-main">
          {this.state.hasError && <p className='red'>There was an error! Oh no!</p>}
          <div className='center'>
            <Switch>
              <PublicOnlyRoute
                exact
                path={'/'}
                component={LoginPage}
              />
              <PublicOnlyRoute
                path={'/create-account'}
                component={RegistrationPage}
              />
              <PrivateRoute
                path={'/home/:begin_date/:end_date'}
                component={HomePage}
              />
              <PrivateRoute
                path={'/profile'}
                component={ProfilePage}
              />
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

