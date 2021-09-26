import React from "react";
import { Route, Redirect} from "react-router";
import { useAuth } from "../context/AuthUserContext";
import * as ROUTES from '../constants/routes';

const PrivateRoute = ({component: Component, ...rest}) => {
    const {currentUser} = useAuth()
    return (
        <Route
            {...rest}
            render={ props => {
                return currentUser ? <Component {...props} /> : <Redirect to={ROUTES.LOGIN} />
            }}
        >
        </Route>
    )
}

export default PrivateRoute;