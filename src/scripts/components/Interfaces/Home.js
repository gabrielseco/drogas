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

var footer = {
  paddingTop: '230px',

};

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
              <BuscadorFechas flux={this.props.flux}/>
              <Footer style={footer}/>
            </div>
        );
      }


    }
});

module.exports = InterfaceHome;
