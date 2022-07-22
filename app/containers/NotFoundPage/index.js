/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import { Typography } from 'antd';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import messages from './messages';

export default function NotFound() {
  return (
   <div className='mt-5 d-flex flex-column justify-content-center align-items-center'>
      <i className='icon-Info-triangle-outline' style={{fontSize:100, color:'#ffb4b4'}}></i>
      <Typography className='text-app-primary'  style={{fontSize:100, marginTop:'-20px'}}>404</Typography>
      <Typography>Không tìm thấy trang này</Typography>

      <Link to={'/'} className="link-text-on-click"> Quay trở về trang chủ</Link>
   </div>
  );
}
