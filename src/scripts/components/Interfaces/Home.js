'use strict';

import React from 'react/addons';
import moment from 'moment';
import BreadCrumb from '../UI/BreadCrumb';
import BuscadorFechas from '../UI/BuscadorFechas';
import Footer from '../UI/Footer';
import Table from '../UI/Table';
import { Link } from 'react-router';


var texto = "";
var centro = "";
var fechaInicial = moment().subtract(1, 'week');
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


        return (
            <div>
              <BreadCrumb centro={centro} texto="Inicio &gt; Listado de peticiones"/>
              <BuscadorFechas/>
              <Link to="altaPeticion">Alta</Link>
              <Table/>
              <Footer/>
            </div>
        );
    }
});

module.exports = InterfaceHome;
