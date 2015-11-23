'use strict';

import React from 'react/addons';
import UITable from './Table';
import ReactSuperSelect from 'React-Super-Select';

var style = {
  paddingLeft:'25px',
  paddingRight:'25px'
}

var height = {
  minHeight: '250px'
}

let BuscadorPacientes = React.createClass({
    getInitialState(){
      return {
        data: false,
        paciente: ''
      };
    },
    handle(){
      console.log('ver peticiones')
      console.log('paciente'+this.state.paciente.id);


      this.props.flux.getActions('peticiones').peticionesFromPaciente(this.state.paciente.id).then((res)=> {
        console.log('data for table', res);
        this.setState({data: res});
      });

    },
    handlerPacientes(option){
      this.setState({
        paciente: option
      });
    },
    render() {
        return (
          <div className="container" id='buscador' style={height}>
            <div className="row" style={style}>
                  <div className="form-group">
                    <label htmlFor="fechaInicio">Paciente</label>
                    <ReactSuperSelect ref="pacientes" placeholder="Seleccione una opción"
                                      dataSource={this.props.pacientes}
                                      onChange={this.handlerPacientes}
                                      searchable={true}/>
                  </div>
                  <button type="button" className="btn btn-default pull-right"
                          onClick={this.handle}>Ver peticiones</button>
            <div className='col-md-12'>
              <UITable data={this.state.data} flux={this.props.flux} />
            </div>

            </div>

          </div>


        );
    }
});

module.exports = BuscadorPacientes;
