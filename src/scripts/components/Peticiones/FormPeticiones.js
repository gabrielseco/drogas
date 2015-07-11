'use strict';

import React from 'react/addons';
import Datepicker from 'react-datepicker';
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


var FormPeticiones = React.createClass({
    mixins: [ Navigation, TransitionHook, State ],
    getInitialState(){
      return {
        fechaNacimiento: ''
      };
    },
    handleForm(e){

      var error = false;
      e.preventDefault();

      var data = {
        nombre: this.refs.nombre.getDOMNode().value,
        asunto: this.refs.asunto.getDOMNode().value,
        observaciones: this.refs.observaciones.getDOMNode().value
      };

      console.log(data);

      this.iterateErrors(data);

      if(error === false) {
        return false;
        //hago la llamada al formulario y entro
        /*this.props.flux.getActions('login').sendContact(data).then((res) =>{
          console.log('res', res);
          if(res[0].Resultado === 200){
            console.log('Contacto envíado mira el correo');
            document.getElementById('mensaje_exito').className = 'alert-info';
          }
          else if(res[0].Resultado === 500){
            console.log('error al enviar el contacto');
            document.getElementById('mensaje_error').className = 'alert-warning';
            this.iterateErrors(data);
          }
          else {
            console.log('VELNEO NO FUNCIONA');
          }

        });*/
      }

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
    render(){
    return (
      <div className="container">
        <div className="row">
          <form className="form-horizontal">
            <div className="form-group">
              <label className="control-label col-md-2">Identificación</label>
              <div className="col-md-4">
                <input type="text" ref="identificacion" value=""/>
              </div>
              <label className="control-label col-md-2">Médico</label>
              <div className="col-md-4">
                <select ref="medicos">
                  <option>Gabriel</option>
                  <option>Gabriel</option>
                  <option>Gabriel</option>
                  <option>Gabriel</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-md-2">Apellidos</label>
              <div className="col-md-4">
                <input type="text" ref="apellidos" value=""/>
              </div>
              <label className="control-label col-md-2">Nombre</label>
              <div className="col-md-4">
              <input type="text" ref="nombre" value=""/>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-md-2">DNI</label>
              <div className="col-md-4">
                <input type="text" ref="dni" value=""/>
              </div>
              <label className="control-label col-md-2">Fecha Nacimiento</label>
              <div className="col-md-4">
                <Datepicker selected={this.state.fechaNacimiento} onChange={this.handleFechaNacimiento} />
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-md-2">Historia</label>
              <div className="col-md-4">
                <textarea type="text" ref="historia" value=""></textarea>
              </div>
              <label className="control-label col-md-2">Historia</label>
              <div className="col-md-4">
                <select ref="sexo">
                  <option>H</option>
                  <option>M</option>
                </select>
              </div>
            </div>
          </form>
        </div>

      </div>
    );
  }
  });

module.exports = FormPeticiones;
