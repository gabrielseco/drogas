'use strict';

import React from 'react/addons';
import BreadCrumb from '../UI/BreadCrumb';
import Footer from '../UI/Footer';
import Loading from '../UI/Loading';
import FormPeticiones from '../Peticiones/FormPeticiones';
import FormModificarPeticiones from '../Peticiones/FormModificarPeticiones';
import { State, Navigation, TransitionHook } from 'react-router';


var centro = "";

let ModificarPeticion = React.createClass({
  mixins: [ Navigation, TransitionHook, State ],
    getInitialState(){
      return {
        centro: '',
        pacientes: '',
        medicos: '',
        analiticas: '',
        form: ''
      };
    },
    componentWillMount(){
      this.props.flux.getActions('login').getCentro().then((res)=> {
        //console.log('res bread', res);
        centro = res[0].Procedencia;
        this.setState({
          centro: centro
        });
      });
      this.props.flux.getActions('peticiones').fetchMedicos().then((res)=> {
        //console.log('res medicos', res);
        this.setState({
          medicos: res
        });
      });
      this.props.flux.getActions('peticiones').fetchPacientes().then((res)=> {
        //console.log('res pacientes', res);
        this.setState({
          pacientes: res
        });
      });

      this.props.flux.getActions('peticiones').fetchAnaliticas().then((res)=> {
        //console.log('res analiticas', res);
        this.setState({
          analiticas: res
        });
      });

      this.props.flux.getActions('peticiones').fetchPeticion(this.getParams().id).then((res)=>{
        this.setState({
          form: res
        });
      });


    },
    render() {
        if(this.state.pacientes === '' || this.state.medicos === '' || this.state.analiticas === ''){
          return (<Loading/>);
        } else if (this.state.form !== '' ){
          return (
            <div>
            <BreadCrumb centro={centro} texto="Inicio &gt; Alta Petición"/>

            <FormModificarPeticiones flux={this.props.flux} medicos={this.state.medicos} pacientes={this.state.pacientes} analiticas={this.state.analiticas} form={this.state.form}/>
            <Footer/>
            </div>
            )



        }
         else {
        return (
            <div>
              <BreadCrumb centro={centro} texto="Inicio &gt; Alta Petición"/>
              <FormPeticiones flux={this.props.flux} medicos={this.state.medicos} pacientes={this.state.pacientes} analiticas={this.state.analiticas} form={this.state.form}/>
              <Footer/>
            </div>
        );
    }
  }
});

module.exports = ModificarPeticion;
