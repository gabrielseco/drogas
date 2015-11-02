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
        form: ''
      };
    },
    componentWillMount(){
      var medicos = '';
      var pacientes = '';
      this.props.flux.getActions('login').getCentro().then((res)=> {
        //console.log('res bread', res);
        centro = res[0].Procedencia;
        var id = this.getParams().id;
        this.setState({
          centro: centro,
          id: id
        });
      });
      this.props.flux.getActions('peticiones').fetchMedicos().then((res)=> {
        //console.log('res medicos', res);
        medicos = res;
        this.setState({
          medicos: res
        });
      });
      this.props.flux.getActions('peticiones').fetchPacientes().then((res)=> {
        //console.log('res pacientes', res);
        pacientes = res;

        this.setState({
          pacientes: res
        });
      });

    },
    render() {
        var texto = "Inicio > Modificar Petición "+this.state.id;
        if(this.state.pacientes === '' || this.state.medicos === ''){
          return (<Loading/>);
        } else {
          return (
            <div>
              <BreadCrumb centro={centro} texto={texto}/>
              <FormModificarPeticiones flux={this.props.flux} medicos={this.state.medicos} pacientes={this.state.pacientes} analiticas={this.state.analiticas} form={this.state.form}/>
              <Footer/>
            </div>
            )



        }

    }
});

module.exports = ModificarPeticion;
