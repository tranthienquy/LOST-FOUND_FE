/**
 *
 * CourseDetailSkeleton
 *
 */

import React from 'react';
import './styles.scss';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Button, Card, Typography, Skeleton } from 'antd';


class CourseDetailSkeleton extends React.Component {
  render(){
     return (<React.Fragment>

<Card className="w-100 introduction-card mt-4">
          <div className="row">
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
              {/* <img
                src={require('../../../images/background/background-icon-1.png')}
                width={'100%'}
                height={'190px'}
              /> */}
              <Skeleton.Button active  style={{width: '10vw', height:'150px'}} />
            </div>
            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
            <Skeleton.Input className='w-75' active/>
              
              <div className="d-flex flex-row">
               <Skeleton active/>
              </div>
              <Skeleton.Input active/>
              <Skeleton active/>
            </div>
          </div>
        </Card>

        <div className="row">
          <div className="d-flex flex-column pr-5 col-xs-12 col-sm-12 col-md-12 col-lg-9">
            <Card
              size="small"
              className="card-description mt-4"
              title={
           <>  <Skeleton.Input active style={{width:'30px'}}/> <Skeleton.Input active className='w-75'/></>  
              }
            >
              <Skeleton active/>
            </Card>
          
          </div>
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-3">
            <Card hoverable className="course-card mt-4">
              <div className="d-flex flex-column">
                
              <Skeleton.Button active  style={{width: '100%', height:'150px'}} />

                <div className="p-2">
                  <Skeleton active/>
                  <Skeleton.Button active/>
                </div>
              </div>
            </Card>
          </div>
        </div>

     </React.Fragment>); 
  }

}

CourseDetailSkeleton.propTypes = {};

export default CourseDetailSkeleton;
