'use strict';

import { Actions } from 'flummox';
import axios from 'axios';
import uuid from '../utils/uuid'
import sessionStorage from '../lib/sessionStorage';

let serverFetchPeticionesMedicos = async function(apiendpoint) {
  var ID = sessionStorage.getItem('ID');
  var TOKEN = sessionStorage.getItem('TOKEN');

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
  var ID = sessionStorage.getItem('ID');
  var TOKEN = sessionStorage.getItem('TOKEN');
  var ID_PROCEDENCIA = sessionStorage.getItem('ID_PROCEDENCIA');

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
  var ID = sessionStorage.getItem('ID');
  var TOKEN = sessionStorage.getItem('TOKEN');
  var ID_PROCEDENCIA = sessionStorage.getItem('ID_PROCEDENCIA');

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

  var ID = sessionStorage.getItem('ID');
  var TOKEN = sessionStorage.getItem('TOKEN');
  var ID_PROCEDENCIA = sessionStorage.getItem('ID_PROCEDENCIA');

  var analitica = null;
  var velneo = null;
  var url = "alta_peticion?id="+ID+"&procedencia="+ID_PROCEDENCIA+"&token="+TOKEN+"&pacientes="+paciente+"&medicos="+medico+"&identificacion="+identificacion;
  //console.log('alta petición', apiendpoint + url);
  velneo = await axios.get(apiendpoint + url);
  //console.log('velneo res send'+JSON.stringify(velneo.data));

  var ID_PETICION = velneo.data[0].ID_PETICION;

  //Con el ID podemos insertar las analíticas

  for(var i = 0; i < data.analiticas.length; i++){
    url = "alta_analiticas?id="+ID+"&procedencia="+ID_PROCEDENCIA+"&token="+TOKEN+"&analiticas="+data.analiticas[i].id+"&ID_PETICION="+ID_PETICION;
    //console.log('analiticas url', url);
    velneo = await axios.get(apiendpoint + url);
  }



  return velneo.data;

};


let serverModifyPeticion = async function(apiendpoint, data) {
  var paciente = data.pacientes.id;
  var medico = data.medicos.id;
  var identificacion = data.identificacion;

  var ID = sessionStorage.getItem('ID');
  var TOKEN = sessionStorage.getItem('TOKEN');
  var ID_PROCEDENCIA = sessionStorage.getItem('ID_PROCEDENCIA');

  var velneo = null;
  var url = "modificar_peticion?id="+ID+"&ID_PETICION="+data.id+"&procedencia="+ID_PROCEDENCIA+"&token="+TOKEN+"&pacientes="+paciente+"&medicos="+medico+"&identificacion="+identificacion;

  console.log('modificar petición', apiendpoint + url);

  velneo = await axios.get(apiendpoint + url);


  return velneo.data;



};

let serverFetchPeticion = async function(apiendpoint, params, medicos, pacientes){
  var ID = sessionStorage.getItem('ID');
  var TOKEN = sessionStorage.getItem('TOKEN');
  var ID_PROCEDENCIA = sessionStorage.getItem('ID_PROCEDENCIA');

  var url = "peticion?ID="+params+"&TOKEN="+TOKEN+"&PROCEDENCIA="+ID_PROCEDENCIA+"&USER_ID="+ID;

  var velneo = await axios.get(apiendpoint + url);

  //console.log('medicos', medicos);
  //console.log('pacientes', pacientes);

  //console.log('datos de la peticion',velneo.data);

  for(var i = 0; i < medicos.length; i++){
    if(medicos[i].id === velneo.data[0].Medico) {
      velneo.data[0].Medico = medicos[i];
    }
  }

  for(var i = 0; i < pacientes.length; i++){
    if(pacientes[i].id === velneo.data[0].Paciente) {
      velneo.data[0].Paciente = pacientes[i];
    }
  }

  //console.log('datos de la peticion for',velneo.data);

  return velneo.data;




};

let serverFetchPeticionesFrom = async function(apiendpoint, params){

  var ID = sessionStorage.getItem('ID');
  var TOKEN = sessionStorage.getItem('TOKEN');
  var ID_PROCEDENCIA = sessionStorage.getItem('ID_PROCEDENCIA');
  var url = "";

  //console.log('params automatic',typeof params);

  if(typeof params === 'string' ){
    url = "peticiones_fechas?ID="+ID+"&TOKEN="+TOKEN+"&PROCEDENCIA="+ID_PROCEDENCIA+"&FI_STR="+params;

  } else {
    var fechaInicio = params.fechaInicio.split("/");

    fechaInicio = fechaInicio[1] + "/" + fechaInicio[0] + "/"+ fechaInicio[2];

    var fechaFinal = params.fechaFinal.split("/");

    fechaFinal = fechaFinal[1] + "/" + fechaFinal[0] + "/"+ fechaFinal[2];

    //console.log(params.fechaInicio);
    url = "peticiones_fechas?ID="+ID+"&TOKEN="+TOKEN+"&PROCEDENCIA="+ID_PROCEDENCIA+"&FI_STR="+fechaInicio+"&FF_STR="+fechaFinal;

  }

  var velneo = await axios.get(apiendpoint + url);

  console.log(apiendpoint + url);

  console.log('velneo data', velneo.data);

  if(velneo.data !== ']'){

    for(var i = 0; i < velneo.data.length; i++){
      velneo.data[i].PRUEBAS_PENDIENTES = parseInt(velneo.data[i].PRUEBAS_PENDIENTES);
      var fecha = velneo.data[i].Fecha.split("/");
      velneo.data[i].Fecha = fecha[1] + "/" + fecha[0] + "/"+ fecha[2];
      if(velneo.data[i].Nombre == ''){
        velneo.data[i].NOMBRE_COMPLETO = velneo.data[i].Apellidos;
      } else if( velneo.data[i].Apellidos === ''){
        velneo.data[i].NOMBRE_COMPLETO = velneo.data[i].Nombre;
      } else {
        velneo.data[i].NOMBRE_COMPLETO = velneo.data[i].Nombre + ", " + velneo.data[i].Apellidos ;
      }
    }
}

  return velneo.data === ']' ? '' : velneo.data ;

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

    async peticionesFrom(params){

      const response = await serverFetchPeticionesFrom(this.apiendpoint, params);
      return response;

    }

    async sendPeticion(peticionData){
      const response = await serverSendPeticion(this.apiendpoint, peticionData);
      return response;
    }

    async modificarPeticion(peticionData) {

      const response = await serverModifyPeticion(this.apiendpoint, peticionData);
      return response;

    }

    async fetchPeticion(params, pacientes, medicos){

      const response = await serverFetchPeticion(this.apiendpoint, params, pacientes, medicos);

      return response;

    }


}
