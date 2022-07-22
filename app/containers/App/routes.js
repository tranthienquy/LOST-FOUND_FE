import React from 'react';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import _ from 'lodash';
import AuthContext from 'utils/auth';
import NotFoundPage from '../NotFoundPage';
import UnAuthorizedPage from '../UnAuthorizedPage';
// import * as adminRoutes from '../Admin/routes';
import * as featureRoutes from '../Features/routes';
import LoadingIndicator from '../../components/LoadingIndicator';


const PrivateRoute = ({ path, exact, component, isSignedIn, endpoint }) => {
  return (
    <Route path={path} exact={exact} render={component}>
      {!isSignedIn ? <Redirect to={{ pathname: `${endpoint}` }} /> : ''}
    </Route>
  );
};

class RouteList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contextAuth: this.context,
    };
  }
getComponent=(route)=> {
  const {user,loading}  = this.context;
  if(loading) return ()=> <LoadingIndicator/>;
  if(!loading){
    if (user){
         if (route.role && route.role.length>0 ){

          return   menu.permission.find((val) => val===user.role.roleName) ?route.main: ()=><UnAuthorizedPage/>
         } else return route.type ==="unauthorized" ? () => <Redirect to={{ pathname: `/` }} /> :  route.main;
    }
    if(!user){
      if (route.role && route.role.length>0 ){ return  ()=><UnAuthorizedPage/> }
      else return route.main;
    }
  }
  return route.main;
}

  GET_ROUTES = () => {
    const contextAuth  = this.context;
    let result = [];
    //Get public routes in Features
    result = featureRoutes.routes.map((route, index) => {
       return  <Route
          key={`route-${index}`}
          path={route.path}
          exact={route.exact}
          render={this.getComponent(route)}
        />
    });;

    // ROLE==NULL, tất cả 
    //Get routes in Admin
    // result.push(
    //   ...adminRoutes.routes.map((route, index) =>
    //     route.private ? (
    //       <PrivateRoute
    //         key={index+100}
    //         path={`${adminRoutes.endpoint}${route.path}`}
    //         exact={route.exact}
    //         component={route.main}
    //         isSignedIn={contextAuth}
    //         endpoint={adminRoutes.endpoint ? adminRoutes.endpoint : ''}
    //       />
    //     ) : (
    //       <Route
    //         key={index+200}
    //         path={`${adminRoutes.endpoint}${route.path}`}
    //         exact={route.exact}
    //         render={route.main}
    //       />
    //     ),
    //   ),
    // );
    result.push( <Route key={'not-found-route'} component={()=><NotFoundPage/>} />)    
    return result;
  };

  render() {
    return <Switch>{this.GET_ROUTES()}</Switch>;
  }
}

RouteList.contextType = AuthContext;
export default withRouter(RouteList);
