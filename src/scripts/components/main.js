'use strict';

import React from 'react';
import Router from 'react-router';
import Immutable from 'immutable';

import { AppFlux } from '../flux/AppFlux';

import App from './App';
import InterfaceLogin from './Interfaces/Login';
import InterfaceHome from './Interfaces/Home';
import InterfaceRest from './Interfaces/Rest';

try {

    require('../../styles/main.scss');

    const flux = new AppFlux();

    const Route = Router.Route,
        DefaultRoute = Router.DefaultRoute;

    var Interfaces = (
      <Route name="root" path="/" handler={App}>
        <DefaultRoute handler={InterfaceLogin} />
        <Route name="home" path="/home" handler={InterfaceHome} />
      </Route>
    );

    Router.run(Interfaces, function (Handler) {
        React.render(<Handler flux={flux} />, document.getElementById('app'));
    });
} catch(e) {
    React.render(
        <div>
            <h2>Error: application could not load</h2>
            <pre>
                <strong>{e.toString()}</strong>
                {!!e.stack && (<div><br />{e.stack}</div>)}
            </pre>
        </div>, document.body
    );

    throw e;
}
