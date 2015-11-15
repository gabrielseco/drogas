'use strict';

import React from 'react/addons';
import { State, Navigation, TransitionHook } from 'react-router';


var clasesForms = {
  errorForm: 'errorForm',
  noDisplay: 'hidden'
};

var clase = clasesForms.noDisplay + ' ' + 'alert-warning';

var mensajes = {
  errorCampos: 'Los datos son incorrectos.',
  corregirCampos: 'Revise los campos.'
};




var FormLogin = React.createClass({
    mixins: [ Navigation, TransitionHook, State ],
    componentDidMount(){
      this.refs.usuario.getDOMNode().focus();
    },
    handleForm(e){

      var error = false;
      e.preventDefault();

      var data = {
        usuario: this.refs.usuario.getDOMNode().value,
        password: this.refs.password.getDOMNode().value
      };

      console.log(data);

      this.iterateErrors(data);

      if(error === false) {
        //hago la llamada al formulario y entro
        this.props.flux.getActions('login').logIn(data).then((res) =>{
          console.log('res', res);
          if(res[0].Resultado === 200){
            this.transitionTo('/home');
          }
          else if(res[0].Resultado === 500){
            console.log('error usuario / contraseña');

            this.refs.usuario.getDOMNode().value = '';
            this.refs.password.getDOMNode().value = '';
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
        <div className="loginForm">
          <p id='mensaje_error' className={clase}>{mensajes.errorCampos} <br/> {mensajes.corregirCampos}</p>
          <input type="text" ref="usuario" id="usuario" defaultValue={this.props.value.usuario} required placeholder="Usuario" />
          <input type="password" ref="password" id="password" defaultValue={this.props.value.password} required placeholder="Contraseña" />
          <br/>
          <input type="submit" className="btn pull-right"
                  value="Entrar" id='login'
                  onClick={this.handleForm}>
         </input>
       </div>
       </form>
    </div>
    );
  }
  });

module.exports = FormLogin;
