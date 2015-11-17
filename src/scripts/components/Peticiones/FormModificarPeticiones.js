'use strict';

import React from 'react/addons';
import Datepicker from 'react-datepicker';
import ReactSuperSelect from 'React-Super-Select';
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


var FormModificarPeticiones = React.createClass({
    mixins: [ Navigation, TransitionHook, State ],
    getInitialState(){
      return {
        fecha: '',
        medicos: '',
        pacientes: '',
        form: ''
      };
    },
    componentWillMount(){
      var id = this.getParams().id;
      this.props.flux.getActions('peticiones').fetchPeticion(id, this.props.medicos, this.props.pacientes).then((res)=> {
        var paciente = {id:res[0].Paciente.id};
        var medico   = {id:res[0].Medico.id};
        this.setState({
          form: res,
          pacientes: paciente,
          medicos: medico
        });

        console.log('form'+JSON.stringify(this.state.form));

        //console.log(this.state.pacientes);
        //console.log(this.state.medicos);
      });
    },
    handleForm(e){

      var error = false;
      var id = this.getParams().id;

      e.preventDefault();

      var data = {
        identificacion: this.refs.identificacion.getDOMNode().value,
        pacientes: this.state.pacientes,
        medicos: this.state.medicos,
        id: id
      };


      //console.log(JSON.stringify(data));

      this.props.flux.getActions('peticiones').modificarPeticion(data).then((res)=> {
        //console.log('res modificar peticion', res);
        if(res[0].Resultado === 200){
          console.log('Petición modificar');
          this.transitionTo('home');
        }
        else if(res[0].Resultado === 500){
          console.log('error al modificar');
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
    render(){
      if(this.state.form !== '') {
        if(this.state.form[0].analiticas.length === 0) {
          var list =  'No hay resultados';
        }
        var list = this.state.form[0].analiticas.map((res,i) => {
          return (<li key={i}>{res.Analitica}</li>)
        });
      return (
      <div className="container" id='peticiones'>
          <form className="form-horizontal" onSubmit={this.handleForm} id="addPeticiones" method="post" role="form">

            <div className="form-group">
              <label className="control-label col-md-2">Identificación</label>
              <div className="col-md-4">
                <input type="text" ref="identificacion" defaultValue={this.state.form[0].Identificacion} />
              </div>
              <label className="control-label col-md-2">Médico</label>
              <div className="col-md-4">
                <ReactSuperSelect ref="medicos" placeholder="Seleccione una opción"
                                  dataSource={this.props.medicos}
                                  onChange={this.handlerMedicos}
                                  searchable={true}
                                  initialValue={this.state.form[0].Medico}/>
              </div>
            </div>
            <div className="form-group">
              <label className="control-label col-md-2">Paciente</label>
              <div className="col-md-4">
              <ReactSuperSelect ref="pacientes" placeholder="Seleccione una opción"
                                dataSource={this.props.pacientes}
                                onChange={this.handlerPacientes}
                                searchable={true}
                                initialValue={this.state.form[0].Paciente}/>
              </div>
              <label className="control-label col-md-2">Analíticas</label>
              <div className="col-md-4">
                {list}
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
  } else {
    return (<div></div>);
  }
  }
  });

module.exports = FormModificarPeticiones;
