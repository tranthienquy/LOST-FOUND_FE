/**
 *
 * MainLayout
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import FeatureLayout from './FeatureLayout';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roleComponent: <FeatureLayout>{this.props.children}</FeatureLayout>,
    };
  }
  render (){
  return (
    <>{this.state.roleComponent}</>
  );
  }

}

MainLayout.propTypes = {};

export default MainLayout;
