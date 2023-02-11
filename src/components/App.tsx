import React from 'react';
import { User } from '../model/Model';
import { AuthService } from '../services/AuthService';
import { Login } from './Auth/Login';
import { Logout } from './Auth/Logout';
import { Route, Routes } from 'react-router-dom'; // Routes replaced Switch
import { Navbar } from './Navbar';
import { Home } from './Home';
import { Profile } from './Profile';
import { Spaces } from './spaces/Spaces';
import { DataService } from '../services/DataService';
import { CreateSpace } from './spaces/CreateSpaces';
import { Reservations } from './reservations/Reservations';
import { SignUp } from './Auth/SignUp';

interface AppState {
  user: User | undefined;
}

export default class App extends React.Component<{}, AppState> {
  private authService: AuthService = new AuthService();
  private dataService: DataService = new DataService();

  constructor(props: any) {
    super(props);
    this.state = {
      user: undefined,
    };

    this.setUser = this.setUser.bind(this);
    this.clearUser = this.clearUser.bind(this);
  }

  private clearUser() {
    this.setState({
      user: undefined,
    });
  }

  private async setUser(user: User) {
    const isAdmin = this.authService.isUserAdmin(user);
    if (isAdmin) {
      user.isAdmin = true;
    }
    this.setState({
      user: user,
    });
    this.dataService.setUser(user);
    await this.authService.getAWSTemporaryCreds(user.cognitoUser);
  }

  render() {
    return (
      <div className='wrapper'>
        <div>
          <Navbar user={this.state.user} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/login'
              element={
                <Login authService={this.authService} setUser={this.setUser} />
              }
            ></Route>
            <Route
              path='/profile'
              element={
                <Profile
                  authService={this.authService}
                  user={this.state.user}
                  dataService={this.dataService}
                />
              }
            />
            <Route
              path='/spaces'
              element={
                <Spaces dataService={this.dataService} user={this.state.user} />
              }
            />
            <Route
              path='/createSpace'
              element={<CreateSpace dataService={this.dataService} />}
            />
          </Routes>
          <Route
            path='/reservations'
            element={
              <Reservations
                dataService={this.dataService}
                user={this.state.user}
              />
            }
          />
          <Route
            path='/logout'
            element={
              <Logout
                user={this.state.user}
                authService={this.authService}
                clearUser={this.clearUser}
              />
            }
          />
          <Route
            path='/signup'
            element={<SignUp authService={this.authService} />}
          />
        </div>
      </div>
    );
  }
}
