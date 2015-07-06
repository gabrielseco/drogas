'use strict';

import React from 'react/addons';
import { State, Navigation, TransitionHook } from 'react-router';


var clasesForms = {
  errorForm: 'errorForm',
  noDisplay: 'hidden'
};

var clase = clasesForms.noDisplay + ' ' + 'alert-warning';

var mensajes = {
  errorCampos: 'No se proporcionaron los suficientes datos',
  corregirCampos: 'Revise los campos.'
};




var FormLogin = React.createClass({
    mixins: [ Navigation, TransitionHook, State ],
    handleForm(e){
      e.preventDefault();

      var data = {
        usuario: this.refs.usuario.getDOMNode().value,
        password: this.refs.password.getDOMNode().value
      };

      console.log(data);

      for (var key in data) {
        if (data.hasOwnProperty(key) && data[key] === '') {
          //we call the function that uses the key which has to be the same as the ref to addClass to the field
          console.log('key ', key);
        }
      }

    },
    render(){
    return (
      <div>
      <form>
        <div className="loginForm">
          <p className={clase}>{mensajes.errorCampos} <br/> {mensajes.corregirCampos}</p>
          <input type="text" ref="usuario" defaultValue={this.props.value.usuario} required placeholder="Usuario" />
          <input type="password" ref="password" defaultValue={this.props.value.password} required placeholder="Contraseña" />
          <input type="submit" className="btn pull-right"
                  value="Entrar"
                  onClick={this.handleForm}>
         </input>
       </div>
       </form>
    </div>
    );
  }
  });

module.exports = FormLogin;
