'use strict';

import React from 'react/addons';
import Datepicker from './Datepicker';
import UITable from './Table';
import moment from 'moment'

let BuscadorFechas = React.createClass({
    getInitialState(){
      return {
        fechaInicial: this.props.fechaInicial,
        fechaFinal: this.props.fechaFinal,
        data: false
      };
    },
    componentWillMount(){
      var now = moment(new Date());

      var date = now.format("DD/MM/YYYY");

      var params = {
        fechaInicio: date,
        fechaFinal: date
      };

      this.props.flux.getActions('peticiones').peticionesFrom(params).then((res)=> {
        console.log('fechas', res);
        this.setState({data: res});
      });
    },
    handle(){
      //console.log('handle');

      var fechaInicio,fechaFinal;
      fechaInicio = document.getElementById('fechaInicio').value;
      fechaFinal   = document.getElementById('fechaFinal').value;

      var params = {
        fechaInicio: fechaInicio,
        fechaFinal: fechaFinal
      };

      this.props.flux.getActions('peticiones').peticionesFrom(params).then((res)=> {
        console.log('data fechas', res);
        this.setState({data: res});
      });

    },
    render() {
        return (
          <div className="container" id='buscador'>
            <div className="row">
              <div className="col-sm-12">
                <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="fechaInicio">Fecha Inicio</label>
                    <Datepicker name="fechaInicio"/>
                  </div>
                  </div>
                  <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="fecha Final">Fecha Final</label>
                    <Datepicker name="fechaFinal"/>
                  </div>
                  <button type="button" className="btn btn-default pull-right"
                          onClick={this.handle}>Enviar Peticiones</button>
                  </div>
                  </div>

              </div>
            </div>
            <UITable data={this.state.data} flux={this.props.flux} />
          </div>
        );
    }
});

module.exports = BuscadorFechas;
