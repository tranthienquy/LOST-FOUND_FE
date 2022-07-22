/**
 *
 * CourseListComponent
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import './styles.scss';
import { Typography, Card, Skeleton, Empty, Tag } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import AuthContext from '../../utils/auth';

class CourseListComponent extends React.Component {
  constructor(props){
    super(props);

 
  
  }
  getCourseList = items => {
    if (!items) return '';
    if (items.length==0 ) return<div style={{height:'35vh'}} className='w-100 d-flex align-items-center justify-content-center'><Empty description="No data"/></div> 
    return items.map(item => (
      <Link
        key={`course-${item._id}`}
        to={`/item/${item._id}`}
        className="col-xs-12 col-sm-12 col-md-6 col-lg-3 mt-2"
      >
        <Card hoverable className="course-card">
          <div className="d-flex flex-column">
            <img
              src={item.image || require('../../images/logo/logo-losting.png')}
              width={'100%'}
              height={'150px'}
              style={{ objectFit: item.image ?'cover':"contain" }}
            />
            <div className="p-2">
              <Typography className="h7 font-weight-bold mb-2">
                {item.title}
              </Typography>
              <Typography
                style={{ fontSize: '12px' }}
                className="d-flex align-items-center text-app-primary"
              >
                <i
                  style={{ fontSize: '17px' }}
                  className="mr-1 icon-User-outline"
                />{' '}
               <span className='mr-1'>{item.user[0].name}</span>
              </Typography>
              <Typography
                style={{ fontSize: '12px' }}
                className="d-flex align-items-center text-app-primary"
              >
                <i
                  style={{ fontSize: '17px' }}
                  className="mr-1 icon-Clock-outline"
                />{' '}
               <span className='mr-1'>{moment(item.createdAt).format('YYYY/MM/DD - hh:mm:ss')}</span>
              </Typography>
              <Typography
                style={{ fontSize: '17px' }}
                className="d-flex align-items-center text-app-primary"
              >
                <i
                  style={{ fontSize: '17px' }}
                  className="mr-1 icon-Apps-outline"
                />{' '}
               <span className='mr-1 font-weight-bold'>{item.lost==="yes" ?"LOST": "FOUND"}</span>
              </Typography>
              <Typography
                style={{ fontSize: '17px' }}
                className="d-flex align-items-center text-app-primary mt-1 "
              >
                {item.status==="Waiting" && <Tag color={'orange'}>Waiting for approvement</Tag>}
                {item.status==="Closed" && <Tag color={'cyan'}>Closed</Tag>}
                {item.status==="Rejected" && <Tag color={'red'}>REJECT</Tag>}

              </Typography>
            </div>
          </div>
        </Card>
      </Link>
    ));
  };

  getLoadingSkeleton = () => {
    return ['', '', '', ''].map((items, index) => (
      <div  key={`loading-course-${index}`}  className="col-xs-12 col-sm-12 col-md-6 col-lg-3 mt-2">
        <Card className="course-card">
          <div className="d-flex flex-column">
           
             <Skeleton.Button active style={{width: '100%', height:'150px'}} />
            <div>
            
              <Skeleton.Input active  className="h7 w-100 font-weight-bold" />
              <Skeleton active size="small"  className=" w-75 font-weight-bold" />
            </div>
          </div>
        </Card>
      </div>
    ));
  };
  render() {
    return (<React.Fragment>
     
        {this.props.loading
          ?  <div className="row mt-3">{this.getLoadingSkeleton()}</div>
          : <div className="row mt-3">{ this.getCourseList(this.props.value)} </div>}
        
     </React.Fragment>
    );
  }
}

CourseListComponent.propTypes = {};
CourseListComponent.contextType = AuthContext;


export default CourseListComponent;
