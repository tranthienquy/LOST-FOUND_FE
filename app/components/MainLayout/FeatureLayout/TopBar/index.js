/**
 *
 * TopBar
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import './styles.scss';

import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { NAVIGATION_MENU } from '../navigation';
import { Link, withRouter } from 'react-router-dom';

import { Typography, Popover, Button, Dropdown, Menu } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { languages } from '../language.const';
import AuthContext from '../../../../utils/auth';
import UserButton from '../../../UserButton';

class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#fffff',
      styleNavigation: 'navigation',
      isShowDrawer: false,
      menu: 'gray',
      cart: {
        price: 0,
        productImages: [],
      },
    };
  }

  getMenuList = () => {
    let menu = NAVIGATION_MENU;
    const { user, loading } = this.context;

    const { styleNavigation } = this.state;
    return menu.map((item, index) => {
      if (item.children) {
        return (
          <Popover
            placement="bottomLeft"
            content={
              <div className="popover-children">
                {this.getSubList(item.items, item.routerLink)}
              </div>
            }
            key={index}
          >
            <div key={index} className={`${styleNavigation}__link`}>
              <div className="d-flex flex-row">
                <Typography className={`${styleNavigation}__text`}>
                  {item.label}
                </Typography>
                {/* <ExpandMoreIcon
                  className={`${styleNavigation}__arrow`}
                  style={{ transition: 'all 0.3s' }}
                /> */}
              </div>
            </div>
          </Popover>
        );
      } else {
        if (
          (!loading &&
            user &&
            item.permission &&
            item.permission.length > 0 &&
            item.permission.find((val) => val===user.role.roleName)) ||
          !item.permission
        )
          return (
            <Link
              to={item.routerLink}
              key={index}
              className={`${styleNavigation}__link`}
            >
              <Typography
                className={`  ${styleNavigation}__text  ${this.getLocationMatchStyle(
                  item.routerLink,
                )} `}
              >
                {item.label}
              </Typography>
            </Link>
          );
      }
    });
  };
  getSubList = (items, parentLink) => {
    const { styleNavigation } = this.state;
    return items.map(element => {
      return (
        <>
          <Link
            to={`/${element.to}`}
            key={element.to}
            className={`${styleNavigation}__link`}
          >
            <Typography className={`${styleNavigation}__sub`}>
              {element.label}
            </Typography>
          </Link>
        </>
      );
    });
  };
  toggleDrawer = open => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    this.setState({
      isShowDrawer: open,
    });
  };

  getLocationMatchStyle = routerLink => {
    if (!routerLink) return '';
    return this.props.history.location.pathname.split('/')[1] ===
      routerLink.split('/')[1]
      ? `${this.state.styleNavigation}__active`
      : '';
  };

  render() {
    return (
      <div
        className="master-header d-flex align-items-center justify-content-between"
        style={{ backgroundColor: this.state.color }}
      >
        <div className=" d-flex flex-row justify-content-start align-items-center">
          <i
            className="menu-button mr-3 icon-Menu h3"
            style={{ color: `${this.state.menu}` }}
            onClick={this.props.toggleDrawer(true)}
          />
          <Link to="">
            <img
              src={require('../../../../images/logo/logo-losting.png')}
              width={'150px'}
            />
          </Link>
          <div className="navigation d-flex flex-row justify-content-start">
            {this.context.user && this.getMenuList()}
          </div>
        </div>
        <div className="d-flex top-right-tab">
          {/* <img src={require('../../../images/logo/logo-fptu.png')} width={'100px'}/> */}

          {this.context.user ? (
            <UserButton />
          ) : (
            <Link to="/login">
              <Button type="primary">
                <i className="icon-User-outline icon-left" />
                    Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    );
  }
}

TopBar.propTypes = {};
TopBar.contextType = AuthContext;

export default withRouter(TopBar);
