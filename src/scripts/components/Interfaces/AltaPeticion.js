'use strict';

import React from 'react/addons';
import BreadCrumb from '../UI/BreadCrumb';
import Footer from '../UI/Footer';
import FormPeticiones from '../Peticiones/FormPeticiones';


var centro = "";

let AltaPeticion = React.createClass({
    getInitialState(){
      return {
        centro: '',
        pacientes: '',
        medicos: '',
        analiticas: ''
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
      this.props.flux.getActions('peticiones').fetchMedicos().then((res)=> {
        console.log('res medicos', res);
        this.setState({
          medicos: res
        });
      });
      this.props.flux.getActions('peticiones').fetchPacientes().then((res)=> {
        console.log('res pacientes', res);
        this.setState({
          pacientes: res
        });
      });

      this.props.flux.getActions('peticiones').fetchAnaliticas().then((res)=> {
        console.log('res analiticas', res);
        this.setState({
          analiticas: res
        });
      });


    },
    render() {
        if(this.state.pacientes === '' || this.state.medicos === ''){
          return (<div></div>);
        } else {
        return (
            <div>
              <BreadCrumb centro={centro} texto="Inicio &gt; Alta Petición"/>
              <FormPeticiones medicos={this.state.medicos} pacientes={this.state.pacientes} analiticas={this.state.analiticas}/>
              <Footer/>
            </div>
        );
    }
  }
});

module.exports = AltaPeticion;
