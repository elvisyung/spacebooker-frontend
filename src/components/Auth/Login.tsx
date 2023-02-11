import React, { SyntheticEvent } from 'react';
// import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { User } from '../../model/Model';
import { AuthService } from '../../services/AuthService';
import './Forms.css';

interface LoginProps {
  authService: AuthService;
  setUser: (user: User) => void;
}

interface LoginState {
  userName: string;
  password: string;
  loginStatusMessage: string;
}

interface CustomEvent {
  target: HTMLInputElement;
}

export class Login extends React.Component<LoginProps, LoginState> {
  state: LoginState = {
    userName: '',
    password: '',
    loginStatusMessage: '',
  };

  private setUserName(event: CustomEvent) {
    this.setState({ userName: event.target.value });
  }

  private setPassword(event: CustomEvent) {
    this.setState({ password: event.target.value });
  }

  private async handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    const result = await this.props.authService.login(
      this.state.userName,
      this.state.password
    );
    if (result) {
      this.setState({});
      this.props.setUser(result);
    } else {
      this.setState({
        loginStatusMessage: 'Login failed. Please check your credentials',
      });
    }
  }

  private renderLoginForm() {
    return (
      <div>
        <h2>Please Login</h2>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <label>User name</label>
          <input
            value={this.state.userName}
            onChange={(e) => this.setUserName(e)}
          />
          <label>Password</label>
          <input
            value={this.state.password}
            onChange={(e) => this.setPassword(e)}
            type='password'
          />
          <input type='submit' value='Login' />
        </form>
        <label className='error'>
          {this.state.loginStatusMessage}
          <br></br>
          <br></br>
        </label>
        <br></br>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderLoginForm()}
        <br></br>
        Don't have an account? <Link to='signup'>Sign up</Link>
      </div>
    );
  }
}
