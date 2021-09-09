import Vue from 'vue'
import VueRouter from 'vue-router'

//importaciones de errores
import error_401 from "../views/errors/401";
import error_403 from "../views/errors/403";
import error_404 from "../views/errors/404";
import error_423 from "../views/errors/423";
import network_error from "../views/errors/network_error";
import error from "../views/errors/error";

//PAGINA INICIAL
import Inicio from "../views/Login/Login.vue"

Vue.use(VueRouter);



const NotFound = { template: "<div>not found</div>" };
const routes = [
  /**
   * path: ruta que el desarrollador establece
   * component: vista o componente .vue
   * name: nombre que se establece para buenas practicas
   * 
   */
  /*
  {
    path: '/dash',
    component: dashboard,
    /*children: [//otra manera de importar componentes, se aplicó de esta manera para determinar cuales son hijos del padre
      // {
      //   path: '/compras',
      //   component: Compras
      // },
      {//SISTEMAS
        path: '/compras',
        component: sistema_compras
      },
 

      
    ],
  },*/
  {
    name: 'inicio',
    path: '/',
    component: Inicio
  },
  {
    path: '/401',
    name: '401',
    component: error_401
  },
  {
    path: '/403',
    name: '403',
    component: error_403
  },
  {
    path: '/404',
    name: '404',
    component: error_404
  },
  {
    path: '/423',
    name: '423',
    component: error_423
  },
  {
    path: '/error',
    name: 'error',
    component: error
  },
  {
    path: '/network_error',
    component: network_error
  },
  { path: "*", component: NotFound }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;