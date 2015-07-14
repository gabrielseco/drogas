'use strict';

import React from 'react/addons';
import Datepicker from 'react-datepicker';
import ReactSuperSelect from 'React-Super-Select';
import Select from '../UI/Select';
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
      console.log(this.props.medicos);

      var handlerExample = function(option) {
        var output = [
          'Searchable Option Item Chosen = {\n',
          '\tID: ', option.ID, '\n',
          '\tvalor: ', option.valor, '\n};'
        ];
        console.log(output.join(''));
      };
    return (
      <div className="container">
        <div className="row">
          <form className="form-horizontal">
            <div className="form-group">
              <label className="control-label col-md-2">Identificación</label>
              <div className="col-md-4">
                <input type="text" ref="identificacion"/>
              </div>
              <label className="control-label col-md-2">Médico</label>
              <div className="col-md-4">
                <ReactSuperSelect ref="medicos" placeholder="Seleccione una opción"
                                  dataSource={this.props.medicos}
                                  onChange={handlerExample}
                                  searchable={true}/>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-md-2">Paciente</label>
              <div className="col-md-4">
              <ReactSuperSelect ref="pacientes" placeholder="Seleccione una opción"
                                dataSource={this.props.pacientes}
                                onChange={handlerExample}
                                searchable={true}/>
              </div>
            </div>
          </form>
        </div>

      </div>
    );
  }
  });

module.exports = FormPeticiones;
