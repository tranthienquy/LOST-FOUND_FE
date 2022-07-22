/**
 *
 * UserButton
 *
 */

import { Button, Dropdown, Menu } from 'antd';
import React from 'react';
import AuthContext from '../../utils/auth';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from './messages';
import { Link } from 'react-router-dom';
import { USER_ROLE } from '../../utils/constants';
import { Firebase } from '../../utils/firebase';

class UserButton extends React.Component {
  logOut = async() => {
   await  Firebase.auth().signOut();

     await localStorage.removeItem(('token'));
     await localStorage.removeItem(('isAdmin'));
    await location.replace('/');
  };
  handleMenuClick(e) {
  }
 ITEMS= [

 ]
  menu = (
    <Menu onClick={this.handleMenuClick}>
      <Menu.Item
        style={{ color: 'red' }}
        onClick={this.logOut}
      >
      <div 
        className="d-flex align-items-center"
>
        <i
          className="icon-Power-button-outline mr-2"
          style={{ fontSize: '20px' }}
        />
      Logout</div>
      </Menu.Item>
    </Menu>
  );
  render() {
    return (
      <Dropdown overlay={this.menu} placement="bottomRight">
        <Button type="primary"> <span className='mr-1'>Hello, </span>
          {this.context.user && (
           this.context.user.name
          ) }
        </Button>
      </Dropdown>
    );
  }
}

UserButton.propTypes = {};
UserButton.contextType = AuthContext;

export default injectIntl (UserButton);
