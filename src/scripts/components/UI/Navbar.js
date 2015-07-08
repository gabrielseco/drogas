'use strict';

import React from 'react/addons';
import {Link, State} from 'react-router';
import localStorage from 'localStorage';

const cx = React.addons.classSet;

let UINavbar = React.createClass({
    mixins: [State],
    cerrar(){
      localStorage.clear();
      this.transitionTo('/');
    },
    render() {

      var token = localStorage.getItem('TOKEN');
      console.log('token navbar', token);
      var list = (<div></div>);
      var ruta = "/";


      if( token !== null) {
        ruta = "/home";
        list = (
        <div className="nav nav-collapse  pull-right">
         <ul id="menu-standard-navigation" className="nav navbar-nav">
           <li id="" className="dropdown active">
             <a title="Configuracion" href="#" data-toggle="dropdown" className="dropdown-toggle js-activated">Configuración</a>
              <ul role="menu" className="dropdown-menu">
                 <li className="">
                   <Link to="configuracion" >Cambiar Contraseña</Link>
                </li>
                <li className="">
                  <a onClick={this.cerrar} title="Cerrar Sesión" href="#">Cerrar Sesión</a>
               </li>
              </ul>
         </li>
        </ul>
      </div>
        );
      }


        return (
          <div className="navbar yamm basic default">
              <div className="navbar-header">
                      <div className="basic-wrapper">
                          <a className="btn responsive-menu pull-right" data-toggle="collapse" data-target=".navbar-collapse">
                            <i></i>
                          </a>
                          <Link className="navbar-brand" to={ruta}>
                              Plan de drogas
                          </Link>
                      </div>
                </div>
                {list}
          </div>
        );
    }
});

module.exports = UINavbar;
