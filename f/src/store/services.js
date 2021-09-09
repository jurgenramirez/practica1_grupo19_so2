import Axios from 'axios'
import router from '../router'
//importación de servicios definidos por el backend

import loginService from "../services/Login/loginService";



// Configuración para el uso de axios
let baseUrl = process.env.VUE_APP_SERVICE_URL;
Axios.defaults.headers.common.Accept = 'application/json'
Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


Axios.interceptors.response.use(response => {//filtra que el consumo de datos sea correcto
    return response
}, error => {
    if (!error.response) {
        router.push('/network_error')
        return
    } if (error.response.status === 404) {
        //router.push('/404')//no encontro la ruta
        console .log("Error de transacción", error.response)
        return;
    } else if (error.response.status === 401) {
        router.push('/401')
    } else {
        if (typeof error.response.data.error === 'object') {// error
        } else if (typeof error.response.data.error !== 'object' && (error.response.status === 422 || error.response.status === 423)) {
            router.push('/423')
            return;
        } else if (error.response.status === 403) {
            router.push('/403')
        }else{
            console .log("Error de transacción", error.response)
        }
    }
    return error
});

export default {//se cargan los servicios ubicados en la carpeta services

    loginService: new loginService(Axios, baseUrl),


}