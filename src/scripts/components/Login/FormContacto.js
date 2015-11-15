'use strict';

import React from 'react/addons';
import { State, Navigation, TransitionHook } from 'react-router';


var clasesForms = {
  errorForm: 'errorForm',
  noDisplay: 'hidden'
};

var clase = clasesForms.noDisplay + ' ' + 'alert-warning';

var mensajes = {
  errorCampos: 'No se ha podido enviar el contacto.',
  corregirCampos: 'Inténtelo más tarde.',
  exito: 'Se ha envíado el contacto correctamente'
};


var FormContacto = React.createClass({
    mixins: [ Navigation, TransitionHook, State ],
    componentDidMount(){
      this.refs.nombre.getDOMNode().focus();
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
        //hago la llamada al formulario y entro
        this.props.flux.getActions('login').sendContact(data).then((res) =>{
          console.log('res', res);
          if(res[0].Resultado === 200){
            console.log('Contacto enviado mira el correo');
            document.getElementById('mensaje_exito').className = 'alert-info';

            this.refs.nombre.getDOMNode().value = '';
            this.refs.asunto.getDOMNode().value = '';
            this.refs.observaciones.getDOMNode().value = '';

          }
          else if(res[0].Resultado === 500){
            console.log('error al enviar el contacto');
            document.getElementById('mensaje_error').className = 'alert-warning';
            this.iterateErrors(data);
          }
          else {
            console.log('VELNEO NO FUNCIONA');
          }

        });
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
      <div>
      <form>
        <div className="contacto">
          <p id='mensaje_error' className={clase}>{mensajes.errorCampos} <br/> {mensajes.corregirCampos}</p>
          <p id='mensaje_exito' className={clase}>{mensajes.exito}</p>
          <input type="text" ref="nombre" id="nombre" value={this.props.value.nombre} required placeholder="Nombre" />
          <input type="text" ref="asunto" id="asunto" value={this.props.value.nombre} required placeholder="Asunto" />
          <textarea cols="40" rows="10" ref="observaciones" id="observaciones"
                    value={this.props.value.observaciones} required placeholder="Tu mensaje"></textarea>
          <input type="submit" className="btn pull-right"
                  value="Enviar"
                  onClick={this.handleForm}>
         </input>
       </div>
       </form>
    </div>
    );
  }
  });

module.exports = FormContacto;
