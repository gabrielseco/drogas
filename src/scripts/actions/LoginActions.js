'use strict';

import { Actions } from 'flummox';
import axios from 'axios';
import uuid from '../utils/uuid'
import sessionStorage from '../lib/sessionStorage';

let serverLogIn = async function(apiendpoint, formContent){
  var token = uuid();
  var url = "login?username="+ formContent.usuario + "&password="+ formContent.password + "&token="+token;
  console.log('url', url);

  var velneo = await axios.get(apiendpoint + url);
  console.log('velneo', velneo.data);

  sessionStorage.setItem('ID_PROCEDENCIA',velneo.data[0].ID_PROCEDENCIA);
  sessionStorage.setItem('TOKEN',token);
  sessionStorage.setItem('ID',velneo.data[0].ID);


  return velneo.data;

};

let serverChangePassword = async function(apiendpoint, formContent) {

  var token = sessionStorage.getItem('TOKEN');
  var url = "cambiar_password?username="+formContent.usuario+ "&password="+formContent.password+"&token="+token;

  console.log('url');

  var velneo = await axios.get(apiendpoint + url);

  return velneo.data;

};

let serverGetCentro = async function(apiendpoint){

  var ID = sessionStorage.getItem('ID');
  var TOKEN = sessionStorage.getItem('TOKEN');

  var url = "usuario?ID="+ ID + "&token="+ TOKEN;
  console.log('url', url);

  var velneo = await axios.get(apiendpoint + url);
  console.log('velneo', velneo.data);

  return velneo.data;

};

let serverSendMessage = async function(apiendpoint, formContent) {
  var TOKEN = sessionStorage.getItem('TOKEN');
  var ID = sessionStorage.getItem('ID');
  var nombre = formContent.nombre;
  var asunto = formContent.asunto;
  var observaciones = formContent.observaciones;

  if(nombre !== '' && asunto !== '' && observaciones !== '' ) {
    var url = "contacto?ID="+ ID +"&ASUNTO="+asunto+ "&observaciones="+observaciones+"&token="+TOKEN;
    var velneo = await axios.get(apiendpoint + url);
    if(velneo.data[0].Resultado === 200){
      var json = {
      'key': 'fvenfDgW5B4JccHRDj-vQg',
        'message': {
          'from_email': 'ggarciaseco@gmail.com',
          'to': [
              {
                'email': 'casaguito@msn.com',
                'name': '',
                'type': 'to'
              }
            ],
          'autotext': true,
          'subject': asunto,
          'html': 'Usuario: '+nombre+'<br/> Asunto: '+asunto+'<br/> Observaciones: '+observaciones
        }
    };
    var mandrill = await axios.post('https://mandrillapp.com/api/1.0/messages/send.json', json);
        console.log('mandrill', mandrill);
    }

    return velneo.data;
  }

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

    async sendContact(formContent) {
      const response = await serverSendMessage(this.apiendpoint, formContent);
      return response;
    }


}
