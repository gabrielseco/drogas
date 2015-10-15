'use strict';

import React from 'react/addons';
import Datepicker from './Datepicker';

let BuscadorFechas = React.createClass({
    getInitialState(){
      return {
        fechaInicial: this.props.fechaInicial,
        fechaFinal: this.props.fechaFinal
      };
    },
    handle(){
      console.log('handle');

      var fechaInicio,fechaFinal;
      var example = this.refs.example.getDOMNode().value;
      fechaInicio = document.getElementById('fechaInicio').value;
      fechaFinal   = document.getElementById('fechaFinal').value;

      var params = {
        fechaInicio: fechaInicio,
        fechaFinal: fechaFinal
      };

      console.log('send',params);

    },
    render() {
        return (
          <div className="col-md-offset-4">
          <form className="form-inline">
          <div className="form-group">
            <label htmlFor="fechaInicio">Fecha Inicio</label>
            <Datepicker name="fechaInicio"/>
          </div>
          <div className="form-group">
            <label htmlFor="fecha Final">Fecha Final</label>
            <Datepicker name="fechaFinal"/>
          </div>
          <input ref="example"/>
          <button type="button" className="btn btn-default" onClick={this.handle}>Enviar Peticiones</button>
          </form>
          </div>
        );
    }
});

module.exports = BuscadorFechas;
