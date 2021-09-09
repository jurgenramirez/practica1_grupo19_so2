import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify' // path to vuetify export
import router from './router'
import store from './store'
import Axios from 'axios'
import VueToast from 'vue-toast-notification';
import VueSweetalert2 from 'vue-sweetalert2';
import 'jquery/src/jquery.js'
import 'vue-toast-notification/dist/theme-sugar.css';
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);
Vue.use(VueToast, {
  position: 'top' //posición de los mensajes emergentes
});


Vue.config.productionTip = false
//llamada de los plugins y herramientas
new Vue({
  vuetify,
  router,
  store,
  Axios,
  render: h => h(App),
}).$mount('#app')



