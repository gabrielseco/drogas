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
      id: medicos[i].ID,
      name: medicos[i].Nombre
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

  //console.log('pacientes url', url);

  let pacientes = await axios.get(apiendpoint + url);
  pacientes = pacientes.data;

  for(var i = 0; i < pacientes.length; i++){
      var nombre = pacientes[i].Nombre + " "+ pacientes[i].Apellidos + " " + pacientes[i].Historia;
      var obj = {
        id: pacientes[i].ID,
        name: nombre
      };

      pacientesSelect.push(obj);

  }


  return pacientesSelect;

};

let serverFetchPeticionesAnaliticas = async function(apiendpoint){
  var ID = localStorage.getItem('ID');
  var TOKEN = localStorage.getItem('TOKEN');
  var ID_PROCEDENCIA = localStorage.getItem('ID_PROCEDENCIA');

  var analiticasSelect = [];

  var url = "analiticas_peticiones?ID="+ID+"&TOKEN="+TOKEN+"&PROCEDENCIA="+ID_PROCEDENCIA;

  //console.log('analiticas url', url);

  let analiticas = await axios.get(apiendpoint + url);
  analiticas = analiticas.data;

  for(var i = 0; i < analiticas.length; i++){
      var obj = {
        id: analiticas[i].ID,
        name: analiticas[i].Nombre
      };

      analiticasSelect.push(obj);

  }


  return analiticasSelect;

};

let serverSendPeticion = async function (apiendpoint, data) {

  //construyo la petición

  var paciente = data.pacientes.id;
  var medico = data.medicos.id;
  var identificacion = data.identificacion;

  var ID = localStorage.getItem('ID');
  var TOKEN = localStorage.getItem('TOKEN');
  var ID_PROCEDENCIA = localStorage.getItem('ID_PROCEDENCIA');

  var analitica = null;
  var velneo = null;
  var url = "alta_peticion?id="+ID+"&procedencia="+ID_PROCEDENCIA+"&token="+TOKEN+"&pacientes="+paciente+"&medicos="+medico+"&identificacion="+identificacion;
  console.log('alta petición', apiendpoint + url);
  velneo = await axios.get(apiendpoint + url);
  console.log('velneo res send'+JSON.stringify(velneo.data));

  var ID_PETICION = velneo.data[0].ID_PETICION;

  //Con el ID podemos insertar las analíticas

  for(var i = 0; i < data.analiticas.length; i++){
    url = "alta_analiticas?id="+ID+"&procedencia="+ID_PROCEDENCIA+"&token="+TOKEN+"&analiticas="+data.analiticas[i].id+"&ID_PETICION="+ID_PETICION;
    console.log('analiticas url', url);
    velneo = await axios.get(apiendpoint + url);
  }



  return velneo.data;

};

let serverFetchPeticion = async function(apiendpoint, params){
  var ID = localStorage.getItem('ID');
  var TOKEN = localStorage.getItem('TOKEN');
  var ID_PROCEDENCIA = localStorage.getItem('ID_PROCEDENCIA');
  var analiticas = new Array();

  var url = "peticion?ID="+params+"&TOKEN="+TOKEN+"&PROCEDENCIA="+ID_PROCEDENCIA+"&USER_ID="+ID;

  var velneo_1 = await axios.get(apiendpoint + url);

  url = "peticion_analiticas?ID="+params+"&TOKEN="+TOKEN+"&PROCEDENCIA="+ID_PROCEDENCIA+"&USER_ID="+ID;


  var velneo_2 = await axios.get(apiendpoint + url);

  for(var i = 0;i < velneo_2.data.length;i++) {
    analiticas.push(velneo_2.data[i].Analitica);
  }

  console.log('analiticas',analiticas);

  velneo_1.data.analiticas = analiticas

  console.log('velneo_1',velneo_1.data);

  return velneo_1.data;


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

    async fetchAnaliticas(){

      const response = await serverFetchPeticionesAnaliticas(this.apiendpoint);
      return response;

    }

    async sendPeticion(peticionData){
      const response = await serverSendPeticion(this.apiendpoint, peticionData);
      return response;
    }

    async fetchPeticion(params){

      const response = await serverFetchPeticion(this.apiendpoint, params);

      return response;

    }

}
