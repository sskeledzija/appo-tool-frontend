import React from 'react';
import { Route, Redirect } from "react-router-dom";

/* eslint-disable react/prop-types */
    const GuardedRoute = ({ component: Component, auth, ...rest }) => {
            return(
                <Route {...rest} render={(props) => (
                    auth === true
                        ? <Component {...props} />
                        : <Redirect to='/login' />
                )} />
            )
        }

export default GuardedRoute;