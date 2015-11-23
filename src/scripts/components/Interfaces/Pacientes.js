'use strict';

import React from 'react/addons';
import moment from 'moment';
import BreadCrumb from '../UI/BreadCrumb';
import BuscadorPacientes from '../UI/BuscadorPacientes'
import Footer from '../UI/Footer';
import Loading from '../UI/Loading';

import { Link } from 'react-router';


var texto = "";
var centro = "";

var pacientes = null;

var footer = {
  paddingTop: '50px',

};

let InterfacePacientes = React.createClass({
    getInitialState(){
      return {
        centro: '',
        pacientes: ''
      };
    },
    componentWillMount(){
      this.props.flux.getActions('login').getCentro().then((res)=> {
        centro = res[0].Procedencia;
        this.setState({
          centro: centro
        });
      });
      this.props.flux.getActions('peticiones').fetchPacientes().then((res)=> {
        console.log('res pacientes buscar pacientes', res);
        this.setState({
          pacientes: res
        });
      });
    },
    render() {
      if(this.state.centro === '' && this.state.pacientes === ''){
        return (<Loading/>);
      } else  {
        return (
            <div>
              <BreadCrumb centro={centro} texto="Inicio &gt; Buscar Paciente"/>
              <BuscadorPacientes pacientes={this.state.pacientes} flux={this.props.flux}/>
              <Footer style={footer}/>
            </div>
        );
      }


    }
});

module.exports = InterfacePacientes;
