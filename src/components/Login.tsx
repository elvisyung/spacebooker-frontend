import React, { SyntheticEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { User } from '../model/Model';
import { AuthService } from '../services/AuthService';

interface LoginProps {
  authService: AuthService;
  setUser: (user: User) => void;
}

interface LoginState {
  userName: string;
  password: string;
  loginAttempted: boolean;
  loginSuccessful: boolean;
}

interface CustomEvent {
  target: HTMLInputElement;
}

export class Login extends React.Component<LoginProps, LoginState> {
  state: LoginState = {
    userName: '',
    password: '',
    loginAttempted: false,
    loginSuccessful: false,
  };

  private setUserName(event: CustomEvent) {
    this.setState({ userName: event.target.value });
  }

  private setPassword(event: CustomEvent) {
    this.setState({ password: event.target.value });
  }

  private async handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    this.setState({ loginAttempted: true });
    const result = await this.props.authService.login(
      this.state.userName,
      this.state.password
    );
    if (result) {
      this.setState({
        loginSuccessful: true,
      });
      this.props.setUser(result);
    } else {
      this.setState({
        loginSuccessful: false,
      });
    }
  }

  render() {
    let loginMessage: any;
    if (this.state.loginAttempted) {
      if (this.state.loginSuccessful) {
        loginMessage = <label>Login Successful</label>;
      } else {
        loginMessage = <label>Login Fail</label>;
      }
    }

    return (
      <div>
        <h2>Please Login</h2>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input
            value={this.state.userName}
            onChange={(e) => this.setUserName(e)}
          />
          <br />
          <input
            value={this.state.password}
            type='password'
            onChange={(e) => this.setPassword(e)}
          />
          <br />
          <input type='submit' value='Login' />
        </form>
        {this.state.loginSuccessful === true ? <Navigate to='/profile' /> : ''}
        {loginMessage}
      </div>
    );
  }
}
