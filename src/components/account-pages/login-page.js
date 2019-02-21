import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { handleRefresh } from '../../actions/auth';
import LoginForm from './login-form';

import './account-pages.css';

export class LoginPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleRefresh());
  }

  render() {
    if (this.props.currentUser !== null) {
      return <Redirect to={`/create`} />;
    }

    if (this.props.loading) {
      return <i class="fas fa-5x fa-spinner" />;
    }

    return (
      <main role="main">
        <div className="account-page-icon">
          <img
            src="../images/deltio-icon-main.png"
            alt="the deltio icon, a postcard"
            className="icon-main"
          />
        </div>
        <div className="account-form-wrapper">
          <h2>Log in</h2>
          <LoginForm />
          <p className="center">
            Demo login:
            <br /> username: <b>testuser</b> | password: <b>password</b>
          </p>
          <br />
          <p>Need an account?</p>
          <button type="submit">
            <Link to="/signup">Sign up here</Link>
          </button>
        </div>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  loading: state.auth.loading
});

export default connect(mapStateToProps)(LoginPage);
