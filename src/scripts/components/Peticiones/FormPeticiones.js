'use strict';

import React from 'react/addons';
import ReactSuperSelect from 'React-Super-Select';
import Loading from '../UI/Loading';
import { State, Navigation, TransitionHook } from 'react-router';


var clasesForms = {
  errorForm: 'errorForm',
  noDisplay: 'hidden'
};

var clase = clasesForms.noDisplay + ' ' + 'alert-warning';

var mensajes = {
  errorCampos: 'No se ha podido enviar la petición.',
  corregirCampos: 'Inténtelo más tarde.',
  exito: 'Se ha envíado la petición correctamente'
};

var textoSelect = "No has seleccionado ninguna opción";


var FormPeticiones = React.createClass({
    mixins: [ Navigation, TransitionHook, State ],
    getInitialState(){
      return {
        fecha: '',
        medicos: '',
        pacientes: '',
        analiticas: ''
      };
    },
    componentDidMount(){
      this.refs.identificacion.getDOMNode().focus();
    },
    handleForm(e){

      var error = false;
      e.preventDefault();

      var data = {
        identificacion: this.refs.identificacion.getDOMNode().value,
        pacientes: this.state.pacientes,
        medicos: this.state.medicos,
        analiticas: this.state.analiticas
      };


      console.log(JSON.stringify(data));

      this.props.flux.getActions('peticiones').sendPeticion(data).then((res)=> {
        console.log('res alta peticion', res);
        if(res[0].Resultado === 200){
          console.log('Petición enviada');
          this.transitionTo('home');
        }
        else if(res[0].Resultado === 500){
          console.log('error al enviar el contacto');
          this.iterateErrors(data);
        }
        else {
          console.log('VELNEO NO FUNCIONA');
        }
      });



    },
    iterateErrors(data){
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          //we call the function that uses the key which has to be the same as the ref to addClass to the field
          console.log('key ', key);
          this.errors(key);
        }
      }
    },
    errors(key){
      var field = document.getElementById(key);

      if(field.value === ''){
        field.className = 'error-form';
      }
      else {
        field.className = '';
      }
    },
    handlerMedicos(option){

      this.setState({
        medicos: option
      });
    },
    handlerPacientes(option){
      this.setState({
        pacientes: option
      });
    },
    handlerAnaliticas(option){
      this.setState({
        analiticas: option
      });
    },
    render(){
    return (
      <div className="container" id='peticiones'>
          <form className="form-horizontal" onSubmit={this.handleForm}id="addPeticiones" method="post" role="form">

            <div className="form-group">
              <label className="control-label col-md-2">Identificación</label>
              <div className="col-md-4">
                <input type="text" ref="identificacion"/>
              </div>
              <label className="control-label col-md-2">Médico</label>
              <div className="col-md-4">
                <ReactSuperSelect ref="medicos" placeholder="Seleccione una opción"
                                  dataSource={this.props.medicos}
                                  onChange={this.handlerMedicos}
                                  searchable={true}/>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-md-2">Paciente</label>
              <div className="col-md-4">
              <ReactSuperSelect ref="pacientes" placeholder="Seleccione una opción"
                                dataSource={this.props.pacientes}
                                onChange={this.handlerPacientes}
                                searchable={true}/>
              </div>
              <label className="control-label col-md-2">Drogas</label>
              <div className="col-md-4">
              <ReactSuperSelect ref="analiticas" placeholder="Seleccione una opción"
                                dataSource={this.props.analiticas}
                                onChange={this.handlerAnaliticas}
                                searchable={true}
                                tags={true}/>
              </div>
              </div>
              <br/><br/>
              <div className="pull-right">
                <input type="submit" className='btn' value="Enviar"/>
              </div>
          </form>
        <br/>
      </div>
    );
  }
  });

module.exports = FormPeticiones;
