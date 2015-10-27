'use strict';

import React from 'react/addons';
import moment from 'moment';
import BreadCrumb from '../UI/BreadCrumb';
import BuscadorFechas from '../UI/BuscadorFechas';
import Footer from '../UI/Footer';
import Loading from '../UI/Loading';

import { Link } from 'react-router';


var texto = "";
var centro = "";
var fechaInicial = moment().format('MM/DD/YYYY');;
var fechaFinal = '';

let InterfaceHome = React.createClass({
    getInitialState(){
      return {
        centro: ''
      };
    },
    componentWillMount(){
      this.props.flux.getActions('login').getCentro().then((res)=> {
        centro = res[0].Procedencia;
        this.setState({
          centro: centro
        });
      });
    },
    render() {
      if(this.state.centro === ''){
        return (<Loading/>);
      } else  {
        return (
            <div>
              <BreadCrumb centro={centro} texto="Inicio &gt; Listado de peticiones"/>
              <BuscadorFechas flux={this.props.flux} fechaInicial={fechaInicial}/>
              <Footer/>
            </div>
        );
      }


    }
});

module.exports = InterfaceHome;
