'use strict';

import React from 'react/addons';
import BreadCrumb from '../UI/BreadCrumb';
import Footer from '../UI/Footer';

var texto = "";
var centro = "";

let InterfaceHome = React.createClass({
    getInitialState(){
      return {
        centro: ''
      };
    },
    componentWillMount(){
      this.props.flux.getActions('login').getCentro().then((res)=> {
        console.log('res bread', res);
        centro = res[0].Procedencia;
        this.setState({
          centro: centro
        });
      });

    },
    render() {


        return (
            <div>
            <BreadCrumb centro={centro} texto="Inicio &gt; Listado de peticiones"/>
            <Footer/>
            </div>
        );
    }
});

module.exports = InterfaceHome;
