import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

/**
 * Define HOC for route protection for routing
 * @param {*} param0 
 * @returns 
 */
const ProtectedRoute = ({ Component, user, ...rest }) => {
  const auth = useSelector(({ auth }) => auth);
  return (
    <Route {...rest} render={
      props => {
        if (auth?.userData?.Data?.access_token) {
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={
            {
              pathname: '/',
              state: {
                from: props.location
              }
            }
          } />
        }
      }
    } />
  )
}

export default ProtectedRoute;
