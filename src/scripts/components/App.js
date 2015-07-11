'use strict';

import React from 'react/addons';
import Router from 'react-router';
import FluxComponent from 'flummox/component';
import UINavbar from './UI/Navbar';

const RouteHandler = Router.RouteHandler;

let App = React.createClass({
    render() {

        return (
            <div className='container-fluid'>
                <FluxComponent {...this.props} >
                    <UINavbar />
                    <RouteHandler />
                </FluxComponent>
            </div>
        );
    }
});

module.exports = App;
