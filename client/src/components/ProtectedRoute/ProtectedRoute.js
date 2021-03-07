
import React from 'react'
import { Redirect } from 'react-router-dom'

class ProtectedRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const user = JSON.parse(localStorage.getItem('profile'));

        const isAuthenticated = user?.token;

        return isAuthenticated ? (
            <Component />
        ) : (
            <Redirect to={{ pathname: '/auth' }} />
        );
    }
}

export default ProtectedRoute;