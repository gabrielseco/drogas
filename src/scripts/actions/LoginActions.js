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

let serverGetCentro = async function(apiendpoint){

  var ID = localStorage.getItem('ID');
  var TOKEN = localStorage.getItem('TOKEN');

  var url = "usuario?ID="+ ID + "&token="+ TOKEN;
  console.log('url', url);

  var velneo = await axios.get(apiendpoint + url);
  console.log('velneo', velneo.data);

  return velneo.data;

};

let serverCreateTodo = function(apiendpoint, todoContent) {

    const newTodo = { id: uuid(), title: todoContent };
    axios.post(apiendpoint + '/todos', newTodo);

    return newTodo; // passed to the store without awaiting REST response for optimistic add
};

let serverDeleteTodo = function(apiendpoint, todo) {
    axios.delete(apiendpoint + '/todos/' + todo.get('id'));
    return todo; // passed to the store without awaiting REST response for optimistic delete
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

    async getCentro(){
      const response = await serverGetCentro(this.apiendpoint);
      return response;
    }


}
