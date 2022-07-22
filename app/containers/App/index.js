/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, withRouter, BrowserRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import AuthContext from '../../utils/auth';
import MainLayout from '../../components/MainLayout';
import RouteList from './routes';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { Helmet } from 'react-helmet';
import GlobalStyle from '../../global-styles';
import ScrollToTop from './ScrollToTop';
import './styles.scss';
import * as api from 'utils/api';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contextValue: null,
      loading: true,
      prefixLink: '',
      setContext: value => {
        this.setState({ contextValue: value });
      },
    };
  }
  componentWillMount=async()=> {
    
    // api.get('v1/FileStorages/get-prefix-link').then(res => {
    //   if (res.status == 200) {
    //     this.setState({ prefixLink: res.data });
    //   }
    // });
     if (localStorage.getItem('token')) {
      if (localStorage.getItem('isAdmin')) {
       await this.setState({ contextValue :{
          name: 'Admin',
          role: {roleName:'admin'},
          username: 'admin'
        } });
      }
      await api.get('users/me').then(res => {
        console.log(res);
        this.setState({ loading: false });
        if (res.status == 200) {
          this.setState({ contextValue: { ...res.data.data } });
        }
      })
    } else {await this.setState({ loading: false });}
    await this.setState({ loading: false });
  }

  render() {
    return (
      <div>
        <AuthContext.Provider
          value={{
            loading: this.state.loading,
            user: this.state.contextValue,
            prefixLink: this.state.prefixLink,
          }}
        >
          <Helmet
            titleTemplate="%s | Losting and Found"
            defaultTitle="Losting and Found"
          />
          <ScrollToTop />
          <MainLayout>
            <RouteList className="route-main" />
          </MainLayout>
          <GlobalStyle />
        </AuthContext.Provider>
      </div>
    );
  }
}
export default withRouter(injectIntl(App));
