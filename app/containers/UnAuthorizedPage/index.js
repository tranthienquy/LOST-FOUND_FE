/**
 *
 * UnAuthorizedPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectUnAuthorizedPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import * as actions from './actions';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';

class UnAuthorizedPage extends React.Component {
  componentWillUnmount() {
    this.props.onEndOfAction();
  }

  render() {
    return (
      <div className='mt-5 d-flex flex-column justify-content-center align-items-center'>
      <i className='icon-Info-triangle-outline' style={{fontSize:100, color:'#ffb4b4'}}></i>
      <Typography className='text-app-primary'  style={{fontSize:100, marginTop:'-20px'}}>401</Typography>
      <Typography>Bạn không có quyền vào trang này</Typography>

      <Link to={'/'} className="link-text-on-click"> Quay trở về trang chủ</Link>
   </div>
    );
  }
}

UnAuthorizedPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  unAuthorizedPage: makeSelectUnAuthorizedPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onEndOfAction: () => {
      dispatch(actions.endOfAction());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'unAuthorizedPage', reducer });
const withSaga = injectSaga({ key: 'unAuthorizedPage', saga });
export default compose(
  withConnect,
  withReducer,
  withSaga,
)(UnAuthorizedPage);
