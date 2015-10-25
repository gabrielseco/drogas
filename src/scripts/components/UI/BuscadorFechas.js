'use strict';

import React from 'react/addons';
import Datepicker from './Datepicker';
import UITable from './Table';

let BuscadorFechas = React.createClass({
    getInitialState(){
      return {
        fechaInicial: this.props.fechaInicial,
        fechaFinal: this.props.fechaFinal,
        data: ''
      };
    },
    handle(){
      console.log('handle');

      var fechaInicio,fechaFinal;
      fechaInicio = document.getElementById('fechaInicio').value;
      fechaFinal   = document.getElementById('fechaFinal').value;

      var params = {
        fechaInicio: fechaInicio,
        fechaFinal: fechaFinal
      };

      console.log('send',params);

      this.props.flux.getActions('peticiones').peticionesFrom(params).then((res)=> {
        console.log('data for table', res);
        this.setState({data: res});
      });

    },
    render() {
        return (
          <div>
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
          <button type="button" className="btn btn-default" onClick={this.handle}>Enviar Peticiones</button>
          </form>
          </div>
          <UITable data={this.state.data} />
          </div>
        );
    }
});

module.exports = BuscadorFechas;
