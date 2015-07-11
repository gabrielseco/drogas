'use strict';

import React from 'react/addons';
import Datepicker from 'react-datepicker';



let BuscadorFechas = React.createClass({
    getInitialState(){
      return {
        fechaInicial: this.props.fechaInicial,
        fechaFinal: this.props.fechaFinal
      };
    },
    handleFechaIChange(date){
      console.log('inicio ', date);
      this.setState({
        fechaInicial: date
      });
    },
    handleFechaFChange(date){
      this.setState({
        fechaFinal: date
      });
    },
    render() {
        return (
            <div className="col-md-offset-4 col-md-8 fechas-peticiones">
              <label>Fecha Inicio</label>
              <div className="div_datepicker">
                <Datepicker selected={this.state.fechaInicial} onChange={this.handleFechaIChange} />
              </div>
              <div className="div_datepicker">
                <Datepicker selected={this.state.fechaFinal} onChange={this.handleFechaFChange}/>
              </div>
              <button className="btn btn-default">Buscar Peticiones</button>
            </div>
        );
    }
});

module.exports = BuscadorFechas;
