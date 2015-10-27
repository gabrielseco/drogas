'use strict';

import React from 'react/addons';
var Table = require('reactabular').Table;
var Search = require('reactabular').Search;
var Paginator = require('react-pagify');
var sortColumn = require('reactabular').sortColumn;
import { Navigation, TransitionHook, State, Link } from 'react-router';

require('reactabular/style.css');


let UITable = React.createClass({
  mixins: [ Navigation, TransitionHook, State ],
    getInitialState(){
      var columns = [
      {
            property: 'Fecha',
            header: 'FECHA'
      },
      {
          property: 'ID_PETICION',
          header: 'ID PETICIÓN'
      }, {
          property: 'NOMBRE_COMPLETO',
          header: 'PACIENTE'
      }, {
          property: 'Medico',
          header: 'DOCTOR'
      },{
          property: 'PRUEBAS_PENDIENTES',
          header: 'PRUEBAS PEND'
      },
      {
        property: 'editar',
        header: 'Editar',
        cell: (value, data, rowIndex, property) => {
           var editar = () => {
             var id = data[rowIndex].ID_PETICION;
             this.transitionTo('/modificarpeticion/:id',{id: id});
            };

           return {
               value: <span>
                   <a onClick={editar} className="edit-btn">Editar</a>
               </span>
           };
         }
       },
       {
         property: 'eliminar',
         header: 'Eliminar',
         cell: (value, data, rowIndex, property) => {
            var eliminar = () => {
              var id = data[rowIndex].ID;
              var pruebas = +data[rowIndex].PRUEBAS_PENDIENTES;

              if(pruebas > 0) {

                alert('tiene pruebas pendientes');


              } else {

                alert('No se pueder eliminar, no hay pruebas pendientes');

              }
              //var english = data[rowIndex].english;

              //var del = confirm('Quieres eliminar la palabra '+english+ ' ?');

              /*if(del){
                this.props.flux.getActions('diccionarios').deleteWords(id).then(function(res){
                  //console.log('res delete', res);
                  if(res[0].Resultado === 200){
                    location.reload();
                  }
                });
              }*/
            };

            return {
                value: <span>
                    <a onClick={eliminar} className="delete-btn">Eliminar</a>
                </span>
            };
          }
        }

    ];
    return {
      data: this.props.data,
      columns: columns,
      pagination: {
        page: 0,
        perPage: 10
      },
      search: {
            column: '',
            query: ''
      },
      header: {
        onClick: (column) => {
        sortColumn(
            this.state.columns,
            column,
            this.setState.bind(this)
        );
      }
    }
    };


    },

  onSearch(search) {

  this.setState({
      search: search
  });
},
onSelect(page) {
  var pagination = this.state.pagination || {};

  pagination.page = page;

  this.setState({
      pagination: pagination
  });
},

onPerPage(e) {
  var pagination = this.state.pagination || {};

  pagination.perPage = parseInt(event.target.value, 10);

  this.setState({
      pagination: pagination
  });
},
render() {
        if(this.props.data === ''){
          return (
              <div>
                <p className='text-center'>No hay datos para mostrar. Hoy no has hecho ninguna petición</p>
              </div>
          );
        } else {
          var dataPagination = this.props.data;
          console.log('data',dataPagination);
          var pagination = this.state.pagination;
          var header = this.state.header;

          if (this.state.search.query) {
            // apply search to data
            // alternatively you could hit backend `onChange`
            // or push this part elsewhere depending on your needs
            dataPagination = Search.search(
                this.props.data,
                this.state.columns,
                this.state.search.column,
                this.state.search.query
            );


        }
        dataPagination = sortColumn.sort(dataPagination, this.state.sortingColumn);
        var paginated = Paginator.paginate(dataPagination, pagination);

        console.log(paginated);




          return (
            <div className="table-react">

            <div className='per-page-container'>
                Resultados <input type='text' defaultValue={pagination.perPage} onChange={this.onPerPage}></input>
          </div>
          <div className='search-container'>
                  Búsqueda <Search columns={this.state.columns} data={this.state.data} onChange={this.onSearch}></Search>
              </div>
            <Table columns={this.state.columns} data={paginated.data} header={header} ></Table>
              <div className='pagination'>
                <Paginator
                    page={paginated.page}
                    pages={paginated.amount}
                    beginPages={3}
                    endPages={3}
                    onSelect={this.onSelect}>
               </Paginator>
            </div>
            <div className='pull-left'>
            <Link to="altaPeticion" className="btn btn-default pull-right">Alta Petición</Link>
            </div>
        </div>
          )
        }

    }
});

module.exports = UITable;
