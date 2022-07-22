import React from 'react';

import Circle from './Circle';
import Wrapper from './Wrapper';
import LoaderLogo from '../../images/icon/loader-icon.gif';

const LoadingIndicator = () => (
  <div style={{width:'100vw',height:"100vh"}} className="d-flex justify-content-center align-items-center">
    <img src={LoaderLogo} width={100}/>
  </div>
);

export default LoadingIndicator;
