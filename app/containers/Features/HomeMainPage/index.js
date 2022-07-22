/**
 *
 * HomeMainPage
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
import makeSelectHomeMainPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import './styles.scss';
import { Link, withRouter } from 'react-router-dom';

import { Splide, SplideSlide } from '@splidejs/react-splide';

import { Typography, Popover, Button, Card, Tag } from 'antd';
import * as actions from './actions';

import CourseListComponent from '../../../components/CourseListComponent';
import AuthContext from '../../../utils/auth';


class HomeMainPage extends React.Component {
  componentWillMount(){
    if (!this.context.user) this.props.history.push('/login');
    this.props.onGetContentList();
  }

  render() {
    const {loading, items} = this.props.homeMainPage;
    return (
      <div className="homemain-page-container d-flex flex-column pt-5">
        <Splide
          aria-label="My Favorite Images"
          className="splide-banner"
          options={{
            perMove: 1,
            perPage: 1,
            autoplay: true,
            autoHeight: true,
            gap: '5rem',
            padding: '0rem',
            type:'loop',
            speed:'1000', interval:'3000'
          }}
        >
           <SplideSlide>
            <div className="splide-banner-item" ><img src="https://firebasestorage.googleapis.com/v0/b/lost-and-found-proj.appspot.com/o/image%2FScreenshot%202022-07-12%20141148.png?alt=media&token=36308a0e-fc9f-420b-971f-6484434900a0"/></div>
          </SplideSlide>
          <SplideSlide>
            <div className="splide-banner-item" ><img src="https://firebasestorage.googleapis.com/v0/b/lost-and-found-proj.appspot.com/o/image%2FScreenshot%202022-07-12%20140936.png?alt=media&token=6cea0d1d-8bf6-4bb2-8686-a8e262197148"/></div>
          </SplideSlide>
         
          <SplideSlide>
            <div className="splide-banner-item" ><img src="https://firebasestorage.googleapis.com/v0/b/lost-and-found-proj.appspot.com/o/image%2FScreenshot%202022-07-12%20141354.png?alt=media&token=544afd71-9da4-4042-9fb7-c6ef3f8dadd4"/></div>
          </SplideSlide>
          
        </Splide>
        <div className="divider align-self-center mt-5" />
       
        <Typography className='text-center head-title font-weight-bold mt-2  text-uppercase'>Recent Post </Typography>
        <Typography className='text-center mt-1'>View our recently featured Lost and Found property entries. </Typography>
           <CourseListComponent loading={loading.items} value={items}/>
          <Link to={'item'} className='link-text-on-click mt-5 text-center font-weight-bold text-app-primary d-flex align-items-center justify-content-center cursor-pointer'>See more<i className='icon-Caret-down'></i>  </Link>

           
  
      </div>
    );
  }
}

HomeMainPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  homeMainPage: makeSelectHomeMainPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onGetContentList: () => {
      dispatch(actions.getContentList());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
HomeMainPage.contextType = AuthContext;


const withReducer = injectReducer({ key: 'homeMainPage', reducer });
const withSaga = injectSaga({ key: 'homeMainPage', saga });
export default compose(
  withConnect,
  withReducer,
  withSaga,
  withRouter
)(HomeMainPage);
