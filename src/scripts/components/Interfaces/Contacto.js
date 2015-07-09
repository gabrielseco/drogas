'use strict';

import React from 'react/addons';
import BreadCrumb from '../UI/BreadCrumb';
import Footer from '../UI/Footer';
import FormContacto from '../Login/FormContacto';

var value = {
  nombre: null,
  asunto: null,
  observaciones: null
};

var centro = "";

let InterfaceContacto = React.createClass({
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
        this.setState({
          centro: centro
        });
      });
    },
    render() {
        return (
            <div>
              <BreadCrumb centro={centro} texto="Inicio &gt; Contacto"/>
              <FormContacto value={value} flux={this.props.flux} />
              <Footer/>
            </div>
        );
    }
});

module.exports = InterfaceContacto;
