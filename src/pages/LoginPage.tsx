import React, { Component } from 'react';
import {RouteComponentProps, withRouter} from 'react-router-dom';

import Login from './Login';

class LoginPage extends Component<RouteComponentProps<{}>> {

    render() {
        return (
            <Login history={this.props.history}></Login>
        )
    }
}

export default withRouter(LoginPage)