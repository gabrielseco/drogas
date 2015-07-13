'use strict';

import { Actions } from 'flummox';
import axios from 'axios';
import uuid from '../utils/uuid'
import localStorage from 'localStorage';

let serverFetchPeticionesMedicos = async function(apiendpoint) {
  var ID = localStorage.getItem('ID');
  var TOKEN = localStorage.getItem('TOKEN');

  var medicosSelect = [];

  var url = "medicos_peticiones?ID="+ID+"&TOKEN="+TOKEN;

  let medicos = await axios.get(apiendpoint + url);
  medicos = medicos.data;

  for(var i = 0; i < medicos.length; i++){
    var obj = {
      ID: medicos[i].ID,
      valor: medicos[i].Nombre
    };

    medicosSelect.push(obj);
  }

  return medicosSelect;
};

let serverFetchPeticionesPacientes = async function(apiendpoint){
  var ID = localStorage.getItem('ID');
  var TOKEN = localStorage.getItem('TOKEN');
  var ID_PROCEDENCIA = localStorage.getItem('ID_PROCEDENCIA');

  var pacientesSelect = [];

  var url = "pacientes_peticiones?ID="+ID+"&TOKEN="+TOKEN+"&PROCEDENCIA="+ID_PROCEDENCIA;

  console.log('pacientes url', url);

  let pacientes = await axios.get(apiendpoint + url);
  pacientes = pacientes.data;

  for(var i = 0; i < pacientes.length; i++){
    var nombre = pacientes[i].Nombre + " "+ pacientes[i].Apellidos + " " + pacientes[i].Historia;
    var obj = {
      ID: pacientes[i].ID,
      valor: nombre
    };

    pacientesSelect.push(obj);
  }


  return pacientesSelect;

};

export class PeticionesActions extends Actions {

    constructor(apiendpoint) {
        super();
        this.apiendpoint = apiendpoint;
    }

    async fetchMedicos(){

      const response = await serverFetchPeticionesMedicos(this.apiendpoint);
      return response;
    }

    async fetchPacientes(){
      const response = await serverFetchPeticionesPacientes(this.apiendpoint);
      return response;
    }

}
