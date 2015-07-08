'use strict';

import React from 'react/addons';
import BreadCrumb from '../UI/BreadCrumb';
import Footer from '../UI/Footer';
import FormConfiguracion from '../Login/FormConfiguracion';

var value = {
  usuario: null,
  password: null
};

var centro = "";
let InterfaceConfiguracion = React.createClass({
    getInitialState(){
      return {
        centro: '',
        value: value
      };
    },
    componentWillMount(){
      this.props.flux.getActions('login').getCentro().then((res)=> {
        console.log('res bread', res);
        centro = res[0].Procedencia;
        value = {
          usuario: res[0].Name,
          password: null
        };
        this.setState({
          centro: centro,
          value: value
        });
      });
    },
    render() {
        return (
            <div>
            <BreadCrumb centro={centro} texto="Inicio &gt; Configuracion &gt; Cambiar contraseña"/>
            <FormConfiguracion value={value} flux={this.props.flux}/>
            <Footer/>
            </div>
        );
    }
});

module.exports = InterfaceConfiguracion;
