/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './styles.scss';
import * as actions from './actions';

import { Card, Typography, Input, Button, Form, Modal } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import { Animated } from 'react-animated-css';
import { LinearProgress } from '@mui/material';
import AuthContext from '../../../utils/auth';
import { StyledFirebaseAuth } from 'react-firebaseui';
import { Firebase } from '../../../utils/firebase.js';
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adminform: false,
      isSignedIn: false,
      errorLoginByFpt: false,
    };
  }
  //  translate = useIntl();
  uiConfig = {
    signInFlow: 'popup',
    signInOptions: ['google.com'],
    signInSuccessUrl: '/signedIn',
    callbacks: {
      signInSuccess: () => false,
    },
  };
  componentWillMount() {}
  onSubmitSearch = value => {
    this.props.onLogin(value, 'admin');
  };
  onFinishFailed = errorInfo => {};

  componentWillUnmount = () => {
    this.props.onEndOfAction();
  };
  componentWillMount() {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const userGmail = {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
        };
        console.log(
          user.email.substring(
            user.email.lastIndexOf('@') + 1,
            user.email.length,
          ),
        );
        const domainName = user.email.substring(
          user.email.lastIndexOf('@') + 1,
          user.email.length,
        );
        // if (domainName !== 'gmail.com') {
        if (domainName !== 'fpt.edu.vn') {
          this.setState({ errorLoginByFpt: true });
          Firebase.auth().signOut();
        } else {
          this.setState({
            isSignedIn: true,
          });
          this.props.onLogin(user);
        }
      }
    });
  }
  switchToAdminForm = () => {
    this.setState({ adminform: !this.state.adminform });
  };
  render() {
    const { intl } = this.props;
    const { loading, error, registerModal } = this.props.loginPage;
    // if (this.context.user !==null) return <Redirect to={{ pathname: `/` }} />
    return (
      <div className="login-container">
        <Animated
          className="d-flex justify-content-center align-items-center w-100 h-100"
          animationIn="fadeInUp"
          animationOut=""
          isVisible={true}
          animationInDuration={500}
          animationInDelay={0}
        >
          <Card className="login-card">
            <div className="d-flex flex-column justify-content-center">
              <Typography className="text-center text-uppercase head-title font-weight-bold mt-2 mb-3">
                LOGIN TO CONTINUE
              </Typography>
              {this.state.adminform ? (
                <Form
                  name="basic"
                  onFinish={this.onSubmitSearch}
                  autoComplete="off"
                  layout="vertical"
                  onFinishFailed={this.onFinishFailed}
                >
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input username',
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      className=""
                      placeholder="Username"
                      prefix={<i className="icon-Envelope h5 login-icon" />}
                    />
                  </Form.Item>
                  <Form.Item
                    name="uid"
                    rules={[
                      {
                        required: true,
                        message: 'Please input password',
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      type="password"
                      placeholder={'Password'}
                      prefix={<i className="icon-Key h5 login-icon" />}
                    />
                  </Form.Item>
                  <Form.Item className="mb-0">
                    <Button
                      disabled={loading}
                      size="large"
                      type="primary"
                      htmlType="submit"
                      className="text-center w-100 mt-3"
                    >
                      <b className="w-100 text-center text-uppercase">LOGIN</b>
                    </Button>
                  </Form.Item>
                  <div style={{ height: '10px' }}>
                    {loading && <LinearProgress color="success" />}
                  </div>
                  {error && (
                    <Typography
                      className="text-center"
                      style={{ color: 'red' }}
                    >
                      Wrong authentication, Please try again!
                    </Typography>
                  )}
                </Form>
              ) : (
                <>
                  {this.state.isSignedIn && (
                    <span className="text-center">
                      Signing on... Please wait
                    </span>
                  )}
                  {loading && <LinearProgress color="success" />}
                  {this.state.errorLoginByFpt && (
                    <Typography
                      className="mt-1 text-center"
                      style={{ color: 'red' }}
                    >
                      Sorry, your email is not <b> FPT domain</b>, refresh page or
                      <span
                        onClick={() => {
                          this.props.history.push('/login');
                        }}
                        className="pl-2 link-text-on-click font-weight-bold"
                      >
                        click here to try again!
                      </span>
                    </Typography>
                  )}
                  <StyledFirebaseAuth
                    uiConfig={this.uiConfig}
                    firebaseAuth={Firebase.auth()}
                  />
                </>
              )}

              <Typography className="mt-1 text-center">
                {this.state.adminform
                  ? 'If you are the user,'
                  : 'If you are admin,'}
                <span
                  onClick={this.switchToAdminForm}
                  className="pl-2 link-text-on-click font-weight-bold"
                >
                  click here to login!
                </span>
              </Typography>
            </div>
          </Card>
        </Animated>
      </div>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loginPage: makeSelectLoginPage(),
});
function mapDispatchToProps(dispatch) {
  return {
    dispatch,

    onLogin: (value, category) => {
      dispatch(actions.login(value, category));
    },
    onEndOfAction: () => {
      dispatch(actions.endOfAction());
    },

    onShowRegisterModal: value => {
      dispatch(actions.showRegisterModal(value));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

LoginPage.contextType = AuthContext;
export default compose(
  withConnect,
  withReducer,
  withSaga,
  injectIntl,
)(LoginPage);
