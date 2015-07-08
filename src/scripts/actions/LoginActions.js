'use strict';

import { Actions } from 'flummox';
import axios from 'axios';
import uuid from '../utils/uuid'
import localStorage from 'localStorage';

let serverFetchTodos = async function(apiendpoint) {
    let todos = await axios.get(apiendpoint + '/todos');
    return todos.data.slice(0, 7);  // passed to the store after REST response (obviously); sliced for the demo
};

let serverLogIn = async function(apiendpoint, formContent){
  var token = uuid();
  var url = "login?username="+ formContent.usuario + "&password="+ formContent.password + "&token="+token;
  console.log('url', url);

  var velneo = await axios.get(apiendpoint + url);
  console.log('velneo', velneo.data);
  localStorage.setItem('ID_PROCEDENCIA', velneo.data[0].ID_PROCEDENCIA);
  localStorage.setItem('TOKEN', token);
  localStorage.setItem('ID', velneo.data[0].ID);
  return velneo.data;

};

let serverChangePassword = async function(apiendpoint, formContent) {

  var token = localStorage.getItem('TOKEN');
  var url = "cambiar_password?username="+formContent.usuario+ "&password="+formContent.password+"&token="+token;

  console.log('url');

  var velneo = await axios.get(apiendpoint + url);

  return velneo.data;

};

let serverGetCentro = async function(apiendpoint){

  var ID = localStorage.getItem('ID');
  var TOKEN = localStorage.getItem('TOKEN');

  var url = "usuario?ID="+ ID + "&token="+ TOKEN;
  console.log('url', url);

  var velneo = await axios.get(apiendpoint + url);
  console.log('velneo', velneo.data);

  return velneo.data;

};


export class LoginActions extends Actions {

    constructor(apiendpoint) {
        super();
        this.apiendpoint = apiendpoint;
    }

    async logIn(formContent) {
      const response = await serverLogIn(this.apiendpoint, formContent);
      return response;
    }

    async changePassword(formContent) {
      const response = await serverChangePassword(this.apiendpoint, formContent);
      return response;
    }

    async getCentro(){
      const response = await serverGetCentro(this.apiendpoint);
      return response;
    }


}
