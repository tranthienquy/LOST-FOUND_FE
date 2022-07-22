/**
 *
 * FeatureLayout
 *
 */

import { extend } from 'lodash';
import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import './styles.scss';
import { FormattedMessage } from 'react-intl';
import { Link, withRouter } from 'react-router-dom';
import TopBar from './TopBar';
import { Button, Drawer, Dropdown, Menu } from 'antd';
import Footer from './Footer';
import UserButton from '../../UserButton';
import { NAVIGATION_MENU } from './navigation';
import { languages } from './language.const';
import AuthContext from '../../../utils/auth';

class FeatureLayout extends React.Component {
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

  showMenus = () => {
    var result = null;
    const { user, loading } = this.context;
    result = NAVIGATION_MENU.map((menu, index) => {
      if (menu.children) {
        return (
          <Menu.SubMenu
            icon={menu.icon}
            title={
              <div style={{ textDecoration: 'none' }}>
                <span className="menu-main pl-3">
                  {menu.label}
                </span>
              </div>
            }
            key={menu.to}
            className=" menu-item-content"
          >
            {menu.children.map((submenu, subindex) => (
              <Menu.Item icon={submenu.icon} key={submenu.to}>
                <Link
                  onClick={this.toggleDrawer(false)}
                  to={`${submenu.routerLink}`}
                  className="nav-link"
                >
                  {submenu.name}
                </Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        );
      }

      if (
        (!loading &&
          user &&
          menu.permission &&
          menu.permission.length > 0 &&
          menu.permission.find((val) => val===user.role.roleName)) ||
        !menu.permission
      )
        return (
          <Menu.Item
            key={menu.routerLink}
            icon={menu.icon}
            className="customclass menu-item-content"
          >
            <Link
              onClick={this.toggleDrawer(false)}
              to={menu.routerLink}
              className="nav-link"
            >
              {menu.label}
            </Link>
          </Menu.Item>
        );
    });
    return result;
  };

  getLocationMatchStyle = () => {
    let result = [];
    NAVIGATION_MENU.forEach(item => {
      if (
        this.props.history.location.pathname.split('/')[1] ===
        item.routerLink.split('/')[1]
      )
        result = [item.routerLink];
    });
    return result;
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

  render() {
    return (
      <>
        <div className={`scroll-up-fixed ${this.state.styleScroll}`}>
          {/* <Tooltip title="Kèo lên trên" placement="up">
          <Button
            type="primary"
            size="large"
            shape="circle"
            onClick={this.onScrollToUp}
            icon={<ExpandLessIcon />}
          />
        </Tooltip> */}
        </div>
        <Drawer
          placement="left"
          key="left"
          closable={false}
          visible={this.state.isShowDrawer}
          onClose={this.toggleDrawer(false)}
          className="drawer"
          title={
            <Link to="" onClick={this.toggleDrawer(false)}>
              {/* <img src={Logo} width={70} /> */}
            </Link>
          }
        >
          <div className="h-100 drawer-content d-flex flex-column justify-content-between">
            <div>
              <Link
                to=""
                className="d-flex w-100 justify-content-center align-items-center"
                onClick={this.toggleDrawer(false)}
              >
                <img
                  src={require('../../../images/logo/logo-losting.png')}
                  width={'70%'}
                />
              </Link>

              <Menu
                mode="inline"
                defaultSelectedKeys={this.getLocationMatchStyle}
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                // defaultOpenKeys={['/about-us', '/service']}
              >
                {this.showMenus()}
              </Menu>
            </div>
            <div className="w-100 d-flex justify-content-center align-items-center">
              {this.context.user ? (
                <UserButton />
              ) : (
                <Link to="/login">
                  <Button type="primary" onClick={this.toggleDrawer(false)}>
                    <i className="icon-User-outline icon-left" />

                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </Drawer>
        <div
          className="master-home-container d-flex align-items-center flex-column"
          onScroll={this.scrollChange}
        >
          <TopBar toggleDrawer={this.toggleDrawer} />
          <div className="master-sub-container">
            <div className="content d-flex flex-column">
              {this.props.children}
            </div>
            <Footer />
          </div>
        </div>
      </>
    );
  }
}

FeatureLayout.propTypes = {};
FeatureLayout.contextType = AuthContext;

export default memo(withRouter(FeatureLayout));
